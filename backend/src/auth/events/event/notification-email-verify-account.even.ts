import { IEvent } from '@nestjs/cqrs'

export class VerifyAccountEvent implements IEvent {
	constructor(
		public readonly email: string,
		public readonly data: {
			username: string
			url: string
		}
	) {}
}
