import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from './entities/level.entity';
import { CreateLevelDto } from './dto/create-level.dto';
import { Activity } from '../activity/entities/activity.entity';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,

    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  // Crear un nivel
  async create(createLevelDto: CreateLevelDto): Promise<Level> {
    const { name, description, main_icon } = createLevelDto;

    const newLevel = this.levelRepository.create({
      name,
      description,
      main_icon,
    });

    return this.levelRepository.save(newLevel);
  }

  // Obtener todos los niveles
  async findAll(): Promise<Level[]> {
    return this.levelRepository.find({
      relations: ['activities'], // Relacionamos las actividades
    });
  }

  // Obtener un nivel por ID
  async findOne(id: number): Promise<Level> {
    const level = await this.levelRepository.findOne({
      where: { id },
      relations: ['activities'], // Relacionamos las actividades
    });
    if (!level) {
      throw new NotFoundException(`Level with ID ${id} not found`);
    }
    return level;
  }

  // Actualizar un nivel por ID
  async update(id: number, updateData: Partial<Level>): Promise<Level> {
    const level = await this.findOne(id);

    Object.assign(level, updateData);
    return this.levelRepository.save(level);
  }

  // Eliminar un nivel por ID
  async remove(id: number): Promise<void> {
    const level = await this.findOne(id);
    await this.levelRepository.remove(level);
  }
}
