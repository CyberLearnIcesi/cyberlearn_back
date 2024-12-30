import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Teacher } from '../../teacher/entities/teacher.entity';
import { Student } from '../../student/entities/student.entity';
import { Topic } from '../../topic/entities/topic.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  term: string;

  @Column()
  schedule: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses)
  teacher: Teacher;

  @ManyToMany(() => Student, (student) => student.courses)
  @JoinTable()
  students: Student[];

  @OneToMany(() => Topic, (topic) => topic.courseEntity)
  topics: Topic[];
}