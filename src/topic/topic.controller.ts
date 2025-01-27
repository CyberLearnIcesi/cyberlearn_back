import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';

@Controller('topics')
@UseGuards(RolesGuard)
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  @Roles('ADMIN', 'TEACHER')
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicService.create(createTopicDto);
  }

  @Get()
  findAll() {
    return this.topicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicService.findOne(+id);
  }

  @Put(':id')
  @Roles('ADMIN', 'TEACHER')
  update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicService.update(+id, updateTopicDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'TEACHER')
  remove(@Param('id') id: string) {
    return this.topicService.remove(+id);
  }
}
