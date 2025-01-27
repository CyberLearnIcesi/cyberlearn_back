import { Module } from '@nestjs/common';
import { ClassGroupService } from './class_group.service';
import { ClassGroupController } from './class_group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassGroup } from './entities/class_group.entity';
import { Course } from '../course/entities/course.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassGroup, Course, User])],
  controllers: [ClassGroupController],
  providers: [ClassGroupService],
})
export class ClassGroupModule {}
