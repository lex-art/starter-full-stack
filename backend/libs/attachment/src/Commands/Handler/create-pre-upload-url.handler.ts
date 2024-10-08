import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { PreUploadUrlService } from '../../services/pre-upload-url.service'
import { CreatePreUploadUrlCommand } from '../Command/create-pre-upload-url.commad'

@CommandHandler(CreatePreUploadUrlCommand)
export class CreatePreUploadUrlHandler implements ICommandHandler<CreatePreUploadUrlCommand> {
	constructor(private readonly preUploadUrlService: PreUploadUrlService) {}

	async execute(command: CreatePreUploadUrlCommand) {
		try {
			return await this.preUploadUrlService.generatePreUploadUrl(command.body)
		} catch (error) {
			return error
		}
	}
}
