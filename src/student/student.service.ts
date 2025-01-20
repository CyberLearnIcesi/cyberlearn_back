import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const { userId, ...studentData } = createStudentDto;

    // Buscar el usuario relacionado
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Verificar que el usuario no esté ya asociado a otro estudiante
    const existingStudent = await this.studentRepository.findOne({ where: { user: { id: userId } } });
    if (existingStudent) {
      throw new BadRequestException(`User with ID ${userId} is already assigned to a student`);
    }

    // Crear y guardar el estudiante
    const student = this.studentRepository.create({ ...studentData, user });
    return this.studentRepository.save(student);
  }

  findAll() {
    // Incluir las relaciones en la consulta
    return this.studentRepository.find({ relations: ['user', 'courses', 'activities'] });
  }

  async findOne(id: number) {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['user', 'courses', 'activities'],
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const { userId, ...studentData } = updateStudentDto;

    // Cargar el estudiante existente
    const student = await this.studentRepository.findOne({ where: { id }, relations: ['user'] });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    // Si se incluye `userId`, buscar el nuevo usuario y actualizar la relación
    if (userId) {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      student.user = user;
    }

    // Actualizar otros datos del estudiante
    Object.assign(student, studentData);

    return this.studentRepository.save(student);
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    return this.studentRepository.remove(student);
  }
}
