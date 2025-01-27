import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from '../../user/entities/user.entity';
  import { Activity } from '../../activity/entities/activity.entity';
  
  @Entity('assignments')
  export class Assignment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'float', nullable: true }) // Calificación del usuario
    grade: number;
  
    @Column({ type: 'timestamp', nullable: true }) // Fecha de finalización
    completedAt: Date;
  
    @ManyToOne(() => User, (user) => user.assignments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' }) // Define la clave foránea
    user: User;
  
    @ManyToOne(() => Activity, (activity) => activity.assignments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'activity_id' }) // Define la clave foránea
    activity: Activity;
  }
  