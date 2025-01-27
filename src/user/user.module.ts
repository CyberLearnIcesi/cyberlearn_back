import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { Assignment } from '../assignment/entities/assignment.entity';
import { ClassGroup } from '../class_group/entities/class_group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Assignment, ClassGroup])],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
  providers: [UserService],
})
export class UserModule {}
