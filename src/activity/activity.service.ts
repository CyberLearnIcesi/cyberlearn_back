import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Topic } from '../topic/entities/topic.entity';
import { Level } from '../level/entities/level.entity';
import { User } from 'src/user/entities/user.entity';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,

    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,

    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Crear una actividad
  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    const { points, topicId, levelId, userIds } = createActivityDto;

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
    let users: User[] = [];
    if (userIds && userIds.length > 0) {
      users = await this.userRepository.findByIds(userIds);
    }

    // Crear la actividad
    const newActivity = this.activityRepository.create({
      points,
      topic,
      level,
      users,
    });

    return this.activityRepository.save(newActivity);
  }

  // Obtener todas las actividades
  async findAll(): Promise<Activity[]> {
    return this.activityRepository.find({
      relations: ['topic', 'level', 'users'],
    });
  }

  // Obtener una actividad por ID
  async findOne(id: number): Promise<Activity> {
    const activity = await this.activityRepository.findOne({
      where: { id },
      relations: ['topic', 'level', 'users'],
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

    if (updateData.userIds) {
      const users = await this.userRepository.findByIds(updateData.userIds);
      activity.users = users;
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
