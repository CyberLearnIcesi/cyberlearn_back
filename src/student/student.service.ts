import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const student = this.studentRepository.create(createStudentDto);
    return this.studentRepository.save(student);
  }

  findAll() {
    return this.studentRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const student = await this.studentRepository.findOne({ where: { id }, relations: ['user'] });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentRepository.preload({ id, ...updateStudentDto });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return this.studentRepository.save(student);
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    return this.studentRepository.remove(student);
  }
}