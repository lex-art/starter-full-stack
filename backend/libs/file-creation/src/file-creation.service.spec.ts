import { Test, TestingModule } from '@nestjs/testing';
import { FileCreationService } from './file-creation.service';

describe('FileCreationService', () => {
  let service: FileCreationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileCreationService],
    }).compile();

    service = module.get<FileCreationService>(FileCreationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
