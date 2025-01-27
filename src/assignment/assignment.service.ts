import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity';
import { User } from '../user/entities/user.entity';
import { Activity } from '../activity/entities/activity.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto'; // Asegúrate de importar el DTO

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>
  ) {}

  // Modificamos el método 'create' para que reciba un CreateAssignmentDto
  async create(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    const { user_id, activity_id, grade, completedAt } = createAssignmentDto;

    const user = await this.userRepository.findOne({ where: { id: user_id } });
  if (!user) {
    throw new Error('User not found');
  }

  const activity = await this.activityRepository.findOne({ where: { id: activity_id } });
  if (!activity) {
    throw new Error('Activity not found');
  }

    const assignment = this.assignmentRepository.create({
      user,
      activity,
      grade,
      completedAt,
    });

    return this.assignmentRepository.save(assignment);
  }

  async findAll() {
    return this.assignmentRepository.find();
  }

  async updateGrade(assignmentId: number, grade: number) {
    const assignment = await this.assignmentRepository.findOneOrFail({ where: { id: assignmentId } });
    assignment.grade = grade;
    return this.assignmentRepository.save(assignment);
  }

  async findByUser(userId: number) {
    return this.assignmentRepository.find({
      where: { user: { id: userId } },
      relations: ['activity'],
    });
  }

  async findByActivity(activityId: number) {
    return this.assignmentRepository.find({
      where: { activity: { id: activityId } },
      relations: ['user'],
    });
  }
}
