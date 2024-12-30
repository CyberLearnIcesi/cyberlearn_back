import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async create(createcourseDto: CreateCourseDto) {
    const courseEntity = this.courseRepository.create(createcourseDto);
    return this.courseRepository.save(courseEntity);
  }

  findAll() {
    return this.courseRepository.find({ relations: ['teacher', 'topics'] });
  }

  async findOne(id: number) {
    const courseEntity = await this.courseRepository.findOne({ where: { id }, relations: ['teacher', 'topics'] });
    if (!courseEntity) {
      throw new NotFoundException(`course with ID ${id} not found`);
    }
    return courseEntity;
  }

  async update(id: number, updatecourseDto: UpdateCourseDto) {
    const courseEntity = await this.courseRepository.preload({ id, ...updatecourseDto });
    if (!courseEntity) {
      throw new NotFoundException(`course with ID ${id} not found`);
    }
    return this.courseRepository.save(courseEntity);
  }

  async remove(id: number) {
    const courseEntity = await this.findOne(id);
    return this.courseRepository.remove(courseEntity);
  }
}