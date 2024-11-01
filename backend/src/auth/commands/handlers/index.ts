import { CreateAccountHandler } from './create-account.handler'
import { DeleteAccountHandler } from './delete-account.command'
import { EmailVerifyOtpHandler } from './email-verify-otp.handler'
import { ForgotPasswordHandler } from './forgot-password.handler'
import { LoginUserHandler } from './login-user.handler'
import { RefreshTokenHandler } from './refresh-token.handler'
import { ResetPasswordHandler } from './reset-pass.handler'

export const CommandHandlers = [
	CreateAccountHandler,
	LoginUserHandler,
	RefreshTokenHandler,
	DeleteAccountHandler,
	EmailVerifyOtpHandler,
	ForgotPasswordHandler,
	ResetPasswordHandler
]
