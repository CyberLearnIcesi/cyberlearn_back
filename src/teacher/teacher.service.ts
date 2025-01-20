import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';
import { Course } from '../course/entities/course.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const { courseIds, ...teacherData } = createTeacherDto;
  
    const teacher = this.teacherRepository.create(teacherData);
  
    if (courseIds && courseIds.length > 0) {
      teacher.courses = await this.courseRepository.findByIds(courseIds);
    }
  
    return this.teacherRepository.save(teacher);
  }
  

  findAll() {
    return this.teacherRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const teacher = await this.teacherRepository.findOne({ where: { id }, relations: ['user'] });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
    return teacher;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.teacherRepository.preload({ id, ...updateTeacherDto });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
    return this.teacherRepository.save(teacher);
  }

  async remove(id: number) {
    const teacher = await this.findOne(id);
    return this.teacherRepository.remove(teacher);
  }
}