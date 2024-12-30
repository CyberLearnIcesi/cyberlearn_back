import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Course } from '../../course/entities/course.entity';
import { User } from '../../user/entities/user.entity';
import { Activity } from '../../activity/entities/activity.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ default: 0 })
  points: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.student)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Course, (courseEntity) => courseEntity.students)
  courses: Course[];

  @ManyToMany(() => Activity, (activity) => activity.students)
  @JoinTable()
  activities: Activity[];
}