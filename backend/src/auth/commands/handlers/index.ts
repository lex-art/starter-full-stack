import { CreateAccountHandler } from './create-account.handler'
import { DeleteAccountHandler } from './delete-account.command'
import { ForgotPasswordHandler } from './forgot-password.handler'
import { LoginUserHandler } from './login-user.handler'
import { RefreshTokenHandler } from './refresh-token.handler'
import { ResendOtpHandler } from './resend-otp.handler'
import { ResendVerificationHandler } from './resend-verification.handler'
import { ResetPasswordHandler } from './reset-pass.handler'
import { VerifyOtpHandler } from './verify-otp.handler'

export const CommandHandlers = [
	CreateAccountHandler,
	LoginUserHandler,
	RefreshTokenHandler,
	DeleteAccountHandler,
	ForgotPasswordHandler,
	ResetPasswordHandler,
	ResendVerificationHandler,
	VerifyOtpHandler,
	ResendOtpHandler
]
