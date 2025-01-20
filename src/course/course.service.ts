import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Student } from '../student/entities/student.entity';
import { Teacher } from '../teacher/entities/teacher.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const { teacherId, students, ...courseData } = createCourseDto;

    const teacher = await this.teacherRepository.findOne({ where: { id: teacherId } });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
    }

    const studentEntities = students
      ? await this.studentRepository.findByIds(students)
      : [];

    const course = this.courseRepository.create({
      ...courseData,
      teacher,
      students: studentEntities,
    });

    return this.courseRepository.save(course);
  }

  findAll() {
    return this.courseRepository.find({ relations: ['teacher', 'students', 'topics'] });
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['teacher', 'students', 'topics'],
    });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const { students, teacherId, ...courseData } = updateCourseDto;

    const course = await this.courseRepository.findOne({ where: { id }, relations: ['students', 'teacher'] });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    if (teacherId) {
      const teacher = await this.teacherRepository.findOne({ where: { id: teacherId } });
      if (!teacher) {
        throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
      }
      course.teacher = teacher;
    }

    if (students) {
      const studentEntities = await this.studentRepository.findByIds(students);
      course.students = studentEntities;
    }

    Object.assign(course, courseData);
    return this.courseRepository.save(course);
  }

  async remove(id: number) {
    const course = await this.findOne(id);
    return this.courseRepository.remove(course);
  }
}
