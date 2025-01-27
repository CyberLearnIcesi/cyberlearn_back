import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { ClassGroup } from '../class_group/entities/class_group.entity';
import { Assignment } from '../assignment/entities/assignment.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(ClassGroup)
    private classGroupRepository: Repository<ClassGroup>,
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { roles, class_groups, assignments, userId, ...userData } = createUserDto;

    // Crear un nuevo usuario
    const user = this.userRepository.create(userData);

    // Asociar roles si se pasan
    if (roles && roles.length > 0) {
      const rolesEntities = await this.roleRepository.findByIds(roles);
      if (rolesEntities.length !== roles.length) {
        throw new NotFoundException('Some roles not found');
      }
      user.roles = rolesEntities;
    }

    // Asociar grupos de clase si se pasan
    if (class_groups && class_groups.length > 0) {
      const classGroupsEntities = await this.classGroupRepository.findByIds(class_groups);
      if (classGroupsEntities.length !== class_groups.length) {
        throw new NotFoundException('Some class groups not found');
      }
      user.class_groups = classGroupsEntities;
    }

    // Asociar asignaciones si se pasan
    if (assignments && assignments.length > 0) {
      const assignmentsEntities = await this.assignmentRepository.findByIds(assignments);
      if (assignmentsEntities.length !== assignments.length) {
        throw new NotFoundException('Some assignments not found');
      }
      user.assignments = assignmentsEntities;
    }

    // Asociar un usuario relacionado si se pasa
    if (userId) {
      const relatedUser = await this.userRepository.findOne({where: {id: userId}});
      if (!relatedUser) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      user.user = relatedUser;
    }

    // Guardar el usuario en la base de datos
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { roles, class_groups, assignments, userId, ...updateData } = updateUserDto;

    const user = await this.userRepository.preload({ id, ...updateData });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Actualizar roles si se pasan
    if (roles && roles.length > 0) {
      const rolesEntities = await this.roleRepository.findByIds(roles);
      if (rolesEntities.length !== roles.length) {
        throw new NotFoundException('Some roles not found');
      }
      user.roles = rolesEntities;
    }

    // Actualizar grupos de clase si se pasan
    if (class_groups && class_groups.length > 0) {
      const classGroupsEntities = await this.classGroupRepository.findByIds(class_groups);
      if (classGroupsEntities.length !== class_groups.length) {
        throw new NotFoundException('Some class groups not found');
      }
      user.class_groups = classGroupsEntities;
    }

    // Actualizar asignaciones si se pasan
    if (assignments && assignments.length > 0) {
      const assignmentsEntities = await this.assignmentRepository.findByIds(assignments);
      if (assignmentsEntities.length !== assignments.length) {
        throw new NotFoundException('Some assignments not found');
      }
      user.assignments = assignmentsEntities;
    }

    // Actualizar el usuario relacionado si se pasa
    if (userId) {
      const relatedUser = await this.userRepository.findOne({where: {id: userId}});
      if (!relatedUser) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      user.user = relatedUser;
    }

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({ relations: ['roles', 'class_groups', 'assignments'] });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['roles', 'class_groups', 'assignments'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email }, relations: ['roles'] });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
}