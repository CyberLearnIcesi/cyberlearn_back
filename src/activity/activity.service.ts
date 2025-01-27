import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Topic } from '../topic/entities/topic.entity';
import { Level } from '../level/entities/level.entity';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Assignment } from '../assignment/entities/assignment.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,

    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,

    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,

    @InjectRepository(Assignment)
    private readonly assigmentRepository: Repository<Assignment>,
  ) {}

  // Crear una actividad
  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    const { points, topicId, levelId, assignmentsIds } = createActivityDto;

    // Verificar que el Topic existe
    const topic = await this.topicRepository.findOneBy({ id: topicId });
    if (!topic) {
      throw new NotFoundException(`Topic with ID ${topicId} not found`);
    }

    // Verificar que el Level existe
    const level = await this.levelRepository.findOneBy({ id: levelId });
    if (!level) {
      throw new NotFoundException(`Level with ID ${levelId} not found`);
    }

    // Opcional: Verificar y asociar usuarios
    let assignments: Assignment[] = [];
    if (assignmentsIds && assignmentsIds.length > 0) {
      assignments = await this.assigmentRepository.findByIds(assignmentsIds);
    }

    // Crear la actividad
    const newActivity = this.activityRepository.create({
      points,
      topic,
      level,
    });

    return this.activityRepository.save(newActivity);
  }

  // Obtener todas las actividades
  async findAll(): Promise<Activity[]> {
    return this.activityRepository.find({
      relations: ['topic', 'level', 'assignments'],
    });
  }

  // Obtener una actividad por ID
  async findOne(id: number): Promise<Activity> {
    const activity = await this.activityRepository.findOne({
      where: { id },
      relations: ['topic', 'level', 'assignments'],
    });
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }
    return activity;
  }

  // Actualizar una actividad por ID
  async update(id: number, updateData: UpdateActivityDto): Promise<Activity> {
    const activity = await this.findOne(id);

    if (updateData.topicId) {
      const topic = await this.topicRepository.findOneBy({ id: updateData.topicId });
      if (!topic) {
        throw new NotFoundException(`Topic with ID ${updateData.topicId} not found`);
      }
      activity.topic = topic;
    }

    if (updateData.levelId) {
      const level = await this.levelRepository.findOneBy({ id: updateData.levelId });
      if (!level) {
        throw new NotFoundException(`Level with ID ${updateData.levelId} not found`);
      }
      activity.level = level;
    }

    Object.assign(activity, updateData);
    return this.activityRepository.save(activity);
  }

  // Eliminar una actividad por ID
  async remove(id: number): Promise<void> {
    const activity = await this.findOne(id);
    await this.activityRepository.remove(activity);
  }
}
