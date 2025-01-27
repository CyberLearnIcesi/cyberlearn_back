import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  // Crear un curso
  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const newCourse = this.courseRepository.create(createCourseDto);
    return this.courseRepository.save(newCourse);
  }

  // Obtener todos los cursos
  async findAll(): Promise<Course[]> {
    return this.courseRepository.find({ relations: ['topics', 'class_groups'] });
  }

  // Obtener un curso por ID
  async findOne(id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['topics', 'class_groups'],
    });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  // Actualizar un curso por ID
  async update(id: number, updateData: Partial<Course>): Promise<Course> {
    const course = await this.findOne(id);
    Object.assign(course, updateData);
    return this.courseRepository.save(course);
  }

  // Eliminar un curso por ID
  async remove(id: number): Promise<void> {
    const course = await this.findOne(id);
    await this.courseRepository.remove(course);
  }
}
