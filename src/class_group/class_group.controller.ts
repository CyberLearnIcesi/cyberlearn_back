import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassGroupService } from './class_group.service';
import { CreateClassGroupDto } from './dto/create-class_group.dto';
import { UpdateClassGroupDto } from './dto/update-class_group.dto';

@Controller('class-group')
export class ClassGroupController {
  constructor(private readonly classGroupService: ClassGroupService) {}

  @Post()
  create(@Body() createClassGroupDto: CreateClassGroupDto) {
    return this.classGroupService.create(createClassGroupDto);
  }

  @Get()
  findAll() {
    return this.classGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassGroupDto: UpdateClassGroupDto) {
    return this.classGroupService.update(+id, updateClassGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classGroupService.remove(+id);
  }
}
