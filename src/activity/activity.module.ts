import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Student } from '../student/entities/student.entity';
import { Topic } from '../topic/entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, Student, Topic])],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
