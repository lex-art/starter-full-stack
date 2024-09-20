import { Module } from '@nestjs/common'
import { CommandHandlers } from './Commands/Handler'
import { CommandServices } from './Commands/services'

@Module({
	providers: [...CommandHandlers, ...CommandServices],
	exports: [...CommandHandlers, ...CommandServices]
})
export class AttachmentModule {}
