import { ICommand } from '@nestjs/cqrs'

export class ForgoPasswordCommand implements ICommand {
	constructor(public readonly email: string) {}
}
