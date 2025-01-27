import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassGroup } from './entities/class_group.entity';
import { CreateClassGroupDto } from './dto/create-class_group.dto';
import { User } from '../user/entities/user.entity';
import { Course } from '../course/entities/course.entity';
import { UpdateClassGroupDto } from './dto/update-class_group.dto';

@Injectable()
export class ClassGroupService {
  constructor(
    @InjectRepository(ClassGroup)
    private readonly classGroupRepository: Repository<ClassGroup>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createClassGroupDto: CreateClassGroupDto): Promise<ClassGroup> {
    const { code, schedule, location, courseId, userIds } = createClassGroupDto;

    const course = await this.courseRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    let users: User[] = [];
    if (userIds && userIds.length > 0) {
      users = await this.userRepository.findByIds(userIds);
    }

    const newClassGroup = this.classGroupRepository.create({
      code,
      schedule,
      location,
      course,
      users,
    });

    return this.classGroupRepository.save(newClassGroup);
  }

  async findAll(): Promise<ClassGroup[]> {
    return this.classGroupRepository.find({
      relations: ['course', 'users'],
    });
  }

  async findOne(id: number): Promise<ClassGroup> {
    const classGroup = await this.classGroupRepository.findOne({
      where: { id },
      relations: ['course', 'users'],
    });
    if (!classGroup) {
      throw new NotFoundException(`ClassGroup with ID ${id} not found`);
    }
    return classGroup;
  }

  async update(id: number, updateData: UpdateClassGroupDto): Promise<ClassGroup> {
    const classGroup = await this.findOne(id);

    if (updateData.courseId) {
      const course = await this.courseRepository.findOneBy({ id: updateData.courseId });
      if (!course) {
        throw new NotFoundException(`Course with ID ${updateData.courseId} not found`);
      }
      classGroup.course = course;
    }

    if (updateData.userIds) {
      const users = await this.userRepository.findByIds(updateData.userIds);
      classGroup.users = users;
    }

    Object.assign(classGroup, updateData);
    return this.classGroupRepository.save(classGroup);
  }

  async remove(id: number): Promise<void> {
    const classGroup = await this.findOne(id);
    await this.classGroupRepository.remove(classGroup);
  }
}
