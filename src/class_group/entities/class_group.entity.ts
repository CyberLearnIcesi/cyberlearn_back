import { User } from '../../user/entities/user.entity';
import { Course } from '../../course/entities/course.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('class_groups')
export class ClassGroup {
    @PrimaryColumn()
    class_group_id: number;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  schedule: string;

  @Column()
  location: string;  

  @ManyToMany(() => User, (user) => user.class_groups)
  @JoinTable()
  users: User[];

  @ManyToOne(() => Course, (course) => course.class_groups)
  course: Course;
}
