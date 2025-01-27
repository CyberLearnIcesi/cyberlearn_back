import { Test, TestingModule } from '@nestjs/testing';
import { ClassGroupController } from './class_group.controller';
import { ClassGroupService } from './class_group.service';

describe('ClassGroupController', () => {
  let controller: ClassGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassGroupController],
      providers: [ClassGroupService],
    }).compile();

    controller = module.get<ClassGroupController>(ClassGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
