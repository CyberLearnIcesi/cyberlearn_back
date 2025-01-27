import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { ClassGroup } from '../../class_group/entities/class_group.entity';
import { Assignment } from '../../assignment/entities/assignment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ 
    name: 'roles_users_users', 
    joinColumn: { name: 'user_id', referencedColumnName: 'id' }, 
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' } 
  })
  roles: Role[];

  @ManyToOne(() => User, (user) => user.user)
  user: User;

  @ManyToMany(() => ClassGroup, (class_group) => class_group.users)
  class_groups: ClassGroup[];

@OneToMany(() => Assignment, (assignment) => assignment.user)
assignments: Assignment[];
}