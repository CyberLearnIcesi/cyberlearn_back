import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { Student } from '../student/entities/student.entity';
import { Topic } from '../topic/entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Teacher, Student, Topic])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class ClassModule {}
