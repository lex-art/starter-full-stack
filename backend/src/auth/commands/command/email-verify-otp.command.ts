import { ICommand } from '@nestjs/cqrs'

export class EmailVerifyOtpCommand implements ICommand {
	constructor(
		public readonly body: {
			readonly email: string
			readonly otp: string
		}
	) {}
}
