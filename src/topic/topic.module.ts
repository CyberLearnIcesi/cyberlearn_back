import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Course } from 'src/course/entities/course.entity';
import { Activity } from '../activity/entities/activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, Course, Activity])],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
