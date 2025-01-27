import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { User } from '../user/entities/user.entity';
import { Activity } from '../activity/entities/activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, User, Activity])],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}
