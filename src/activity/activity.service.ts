import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async create(createActivityDto: CreateActivityDto) {
    const activity = this.activityRepository.create(createActivityDto);
    return this.activityRepository.save(activity);
  }

  findAll() {
    return this.activityRepository.find({ relations: ['class', 'topics'] });
  }

  async findOne(id: number) {
    const activity = await this.activityRepository.findOne({ where: { id }, relations: ['class', 'topics'] });
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }
    return activity;
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    const activity = await this.activityRepository.preload({ id, ...updateActivityDto });
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }
    return this.activityRepository.save(activity);
  }

  async remove(id: number) {
    const activity = await this.findOne(id);
    return this.activityRepository.remove(activity);
  }
}