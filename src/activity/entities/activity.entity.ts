import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Topic } from '../../topic/entities/topic.entity';
import { Level } from '../../level/entities/level.entity';
import { User } from 'src/user/entities/user.entity';

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

  @ManyToMany(() => User, (users) => users.activities)
  @JoinTable()
  users: User[];
}