import { PreUploadUrlDto } from '@app/attachment/dto/pre-upload-url.dto'
import { ICommand } from '@nestjs/cqrs'

export class CreatePreUploadUrlCommand implements ICommand {
	constructor(public readonly body: PreUploadUrlDto) {}
}
