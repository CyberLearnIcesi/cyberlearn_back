import { Controller, Post, Body, Param, Patch, Get } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { Assignment } from './entities/assignment.entity';

@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  async createAssignment(@Body() createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    return this.assignmentService.create(createAssignmentDto); 
  }

  @Patch(':id/grade')
  async updateGrade(@Param('id') id: number, @Body('grade') grade: number) {
    return this.assignmentService.updateGrade(id, grade);
  }

  @Get('user/:userId')
  async getAssignmentsByUser(@Param('userId') userId: number) {
    return this.assignmentService.findByUser(userId);
  }

  @Get()
  async getAssignments() {
    return this.assignmentService.findAll();
  }

  @Get('activity/:activityId')
  async getAssignmentsByActivity(@Param('activityId') activityId: number) {
    return this.assignmentService.findByActivity(activityId);
  }
}
