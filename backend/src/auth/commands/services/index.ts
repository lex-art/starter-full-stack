import { AuthService } from './auth.service'
import { CreateUserService } from './create-user.service'
import { DeleteAccountService } from './delete-account.service'
import { FindUserService } from './find-user.service'
import { RefreshTokenService } from './refresh-token.service'
import { ResetPasswordService } from './reset-password.service'
import { TokenVerificationService } from './token-verification.service'

export const CommandServices = [
	AuthService,
	CreateUserService,
	ResetPasswordService,
	RefreshTokenService,
	TokenVerificationService,
	FindUserService,
	DeleteAccountService
]
