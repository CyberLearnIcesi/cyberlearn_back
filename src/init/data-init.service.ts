import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Role } from '../role/entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DataInitService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.initializePermissions();
    await this.initializeRoles();
    await this.initializeAdminUser();
  }

  private async initializePermissions(): Promise<void> {
    const permissions = ['READ', 'WRITE', 'UPDATE', 'DELETE'];
    for (const name of permissions) {
      const exists = await this.permissionRepository.findOne({ where: { name } });
      if (!exists) {
        const permission = this.permissionRepository.create({ name });
        await this.permissionRepository.save(permission);
      }
    }
  }

  private async initializeRoles(): Promise<void> {
    const roles = [
      { name: 'STUDENT', permissions: ['READ', 'WRITE'], description: 'Role for students' },
      { name: 'TEACHER', permissions: ['READ', 'WRITE', 'UPDATE', 'DELETE'], description: 'Role for teachers' },
      { name: 'ADMIN', permissions: ['READ', 'WRITE', 'UPDATE', 'DELETE'], description: 'Role for administrators' },
    ];

    for (const roleData of roles) {
      const { name, permissions, description } = roleData;

      let role = await this.roleRepository.findOne({
        where: { name },
        relations: ['permissions'],
      });

      if (!role) {
        role = this.roleRepository.create({ name, description });
      }

      const permissionEntities = await this.permissionRepository.find({
        where: permissions.map((permissionName) => ({ name: permissionName })),
      });

      role.permissions = permissionEntities;
      await this.roleRepository.save(role);
    }
  }
  
  private async initializeAdminUser(): Promise<void> {
    const adminEmail = 'admin@admin.com';
    const adminPassword = 'password';

    let adminUser = await this.userRepository.findOne({
      where: { email: adminEmail },
      relations: ['roles'],
    });

    if (!adminUser) {
      const adminRole = await this.roleRepository.findOne({
        where: { name: 'ADMIN' },
        relations: ['permissions'],
      });

      if (!adminRole) {
        throw new Error('Admin role not found. Please ensure roles are initialized properly.');
      }

      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      console.log('roles creando: ' + [adminRole])

      adminUser = this.userRepository.create({
        name: 'Admin',
        lastname: 'User',
        email: adminEmail,
        password: hashedPassword,
        roles: [adminRole],
      });

      await this.userRepository.save(adminUser);
      console.log('Admin user created successfully!');
    }
  }
}
