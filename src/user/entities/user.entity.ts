import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { ClassGroup } from '../../class_group/entities/class_group.entity';
import { Activity } from 'src/activity/entities/activity.entity';

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
  roles: Role[];

  @ManyToOne(() => User, (user) => user.user)
  @JoinTable()
  user: User;

  @ManyToMany(() => ClassGroup, (class_group) => class_group.users)
  class_groups: ClassGroup[];

  @ManyToMany(() => Activity, (activities) => activities.users)
  activities: Activity[];
}