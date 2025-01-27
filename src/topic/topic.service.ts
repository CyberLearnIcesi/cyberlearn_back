import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';
import { Activity } from '../activity/entities/activity.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async create(createTopicDto: CreateTopicDto) {
    const { activityIds, ...topicData } = createTopicDto;
  
    const topic = this.topicRepository.create(topicData);
  
    if (activityIds && activityIds.length > 0) {
      topic.activities = await this.activityRepository.findByIds(activityIds);
    }
  
    return this.topicRepository.save(topic);
  }
  

  findAll() {
    return this.topicRepository.find({ relations: ['activities'] });
  }

  async findOne(id: number) {
    const topic = await this.topicRepository.findOne({ where: { id }, relations: ['activities'] });
    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
    return topic;
  }

  async update(id: number, updateTopicDto: UpdateTopicDto) {
    const topic = await this.topicRepository.preload({ id, ...updateTopicDto });
    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
    return this.topicRepository.save(topic);
  }

  async remove(id: number) {
    const topic = await this.findOne(id);
    return this.topicRepository.remove(topic);
  }
}
