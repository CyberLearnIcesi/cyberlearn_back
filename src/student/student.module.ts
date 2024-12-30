import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Course } from 'src/course/entities/course.entity';
import { Activity } from '../activity/entities/activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Course, Activity])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
