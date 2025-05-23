import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { ActivityService } from './activity.service';
import { Topic } from '../topic/entities/topic.entity';
import { Level } from '../level/entities/level.entity';
import { User } from '../user/entities/user.entity';
import { Assignment } from '../assignment/entities/assignment.entity';
import { ActivityController } from './activity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, Topic, Level, User, Assignment])],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService],
})
export class ActivityModule {}
