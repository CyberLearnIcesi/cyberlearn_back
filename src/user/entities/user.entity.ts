import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Student } from '../../student/entities/student.entity';
import { Teacher } from '../../teacher/entities/teacher.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToOne(() => Teacher, (teacher) => teacher.user)
  teacher: Teacher;

  @OneToOne(() => Student, (student) => student.user)
  student: Student;
}