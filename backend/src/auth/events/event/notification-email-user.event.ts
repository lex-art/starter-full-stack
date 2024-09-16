import { IEvent } from '@nestjs/cqrs'

export class UserCreatedEvent implements IEvent {
	constructor(
		public readonly email: string,
		public readonly username: string
	) {}
}
