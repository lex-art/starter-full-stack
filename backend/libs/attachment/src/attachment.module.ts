import { Module } from '@nestjs/common';
import { AttachmentService } from './attachment.service';

@Module({
  providers: [AttachmentService],
  exports: [AttachmentService],
})
export class AttachmentModule {}
