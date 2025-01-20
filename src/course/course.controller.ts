import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from '../auth/decorators/role.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';

@Controller('course')
@UseGuards(RolesGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Roles('TEACHER')
  @Roles('ADMIN')
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  @Roles('TEACHER')
  @Roles('ADMIN')
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  @Roles('TEACHER')
  @Roles('ADMIN')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  @Roles('TEACHER')
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  @Roles('TEACHER')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
