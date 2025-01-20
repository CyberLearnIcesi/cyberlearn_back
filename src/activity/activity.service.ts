import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';
import { Student } from '../student/entities/student.entity';
import { Topic } from '../topic/entities/topic.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
  ) {}

  async create(createActivityDto: CreateActivityDto) {
    const { topicId, students, ...activityData } = createActivityDto;

    const topic = await this.topicRepository.findOne({ where: { id: topicId } });
    if (!topic) {
      throw new NotFoundException(`Topic with ID ${topicId} not found`);
    }

    const studentEntities = students
      ? await this.studentRepository.findByIds(students)
      : [];

    const activity = this.activityRepository.create({
      ...activityData,
      topic,
      students: studentEntities,
    });

    return this.activityRepository.save(activity);
  }

  findAll() {
    return this.activityRepository.find({ relations: ['topic', 'students'] });
  }

  async findOne(id: number) {
    const activity = await this.activityRepository.findOne({
      where: { id },
      relations: ['topic', 'students'],
    });
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }
    return activity;
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    const { students, topicId, ...activityData } = updateActivityDto;

    const activity = await this.activityRepository.findOne({ where: { id }, relations: ['students', 'topic'] });
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }

    if (topicId) {
      const topic = await this.topicRepository.findOne({ where: { id: topicId } });
      if (!topic) {
        throw new NotFoundException(`Topic with ID ${topicId} not found`);
      }
      activity.topic = topic;
    }

    if (students) {
      const studentEntities = await this.studentRepository.findByIds(students);
      activity.students = studentEntities;
    }

    Object.assign(activity, activityData);
    return this.activityRepository.save(activity);
  }

  async remove(id: number) {
    const activity = await this.findOne(id);
    return this.activityRepository.remove(activity);
  }
}
