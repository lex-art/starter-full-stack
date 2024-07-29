import { Module } from '@nestjs/common';
import { FileCreationService } from './file-creation.service';

@Module({
  providers: [FileCreationService],
  exports: [FileCreationService],
})
export class FileCreationModule {}
