import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from '../activity/entities/activity.entity';
import { Level } from './entities/level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Level, Activity])],
  controllers: [LevelController],
  providers: [LevelService],
})
export class LevelModule {}
