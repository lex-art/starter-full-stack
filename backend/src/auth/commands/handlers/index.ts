import { DeleteAccountCommand } from '../command/delete-account.command'
import { EmailVerifyOtpCommand } from '../command/email-verify-otp.command'
import { ForgoPasswordCommand } from '../command/forgot-password.command'
import { ResetPasswordCommand } from '../command/reset-pass.command'
import { CreateAccountHandler } from './create-account.handler'
import { LoginUserHandler } from './login-user.handler'
import { RefreshTokenHandler } from './refresh-token.handler'

export const CommandHandlers = [
	CreateAccountHandler,
	LoginUserHandler,
	RefreshTokenHandler,
	DeleteAccountCommand,
	EmailVerifyOtpCommand,
	ForgoPasswordCommand,
	ResetPasswordCommand
]
