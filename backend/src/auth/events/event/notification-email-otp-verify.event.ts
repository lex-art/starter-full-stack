import { IEvent } from '@nestjs/cqrs'

export class NotificationEmailOTPEvent implements IEvent {
	constructor(
		public readonly email: string,
		public readonly data: {
			username: string
			otp: string
		}
	) {}
}
