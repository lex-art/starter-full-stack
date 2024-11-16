import { IEvent } from '@nestjs/cqrs'

export class UserCreatedEvent implements IEvent {
	constructor(
		public readonly email: string,
		public readonly data: {
			username: string
			password: string
			url: string
		}
	) {}
}
