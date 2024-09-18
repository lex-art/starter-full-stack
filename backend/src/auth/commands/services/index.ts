import { AuthService } from './auth.service'
import { CreateUserService } from './create-user.service'
import { DeleteAccountService } from './delete-account.service'
import { EmailGenerateOtpService } from './email-generate-otp.service'
import { EmailVerifyOtpService } from './email-verify-otp.service'
import { FindUserService } from './find-user.service'
import { RefreshTokenService } from './refresh-token.service'
import { ResetPasswordService } from './reset-password.service'

export const CommandServices = [
	AuthService,
	CreateUserService,
	ResetPasswordService,
	RefreshTokenService,
	EmailGenerateOtpService,
	EmailVerifyOtpService,
	FindUserService,
	DeleteAccountService
]
