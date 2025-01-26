import { Module } from '@nestjs/common';
import { ClassGroupService } from './class_group.service';
import { ClassGroupController } from './class_group.controller';

@Module({
  controllers: [ClassGroupController],
  providers: [ClassGroupService],
})
export class ClassGroupModule {}
