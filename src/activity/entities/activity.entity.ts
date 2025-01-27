import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Topic } from '../../topic/entities/topic.entity';
import { Level } from '../../level/entities/level.entity';
import { Assignment } from '../../assignment/entities/assignment.entity';

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  points: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Topic, (topic) => topic.activities)
  topic: Topic;

  @ManyToOne(() => Level, (level) => level.activities)
  level: Level;

@OneToMany(() => Assignment, (assignment) => assignment.activity)
assignments: Assignment[];
}