import { AuthService } from './auth.service'
import { CreateUserService } from './create-user.service'
import { DeleteAccountService } from './delete-account.service'
import { FindUserService } from './find-user.service'
import { GenerateVerificationService } from './generate-verification.service'
import { RefreshTokenService } from './refresh-token.service'
import { ResetPasswordService } from './reset-password.service'

export const CommandServices = [
	AuthService,
	CreateUserService,
	ResetPasswordService,
	RefreshTokenService,
	GenerateVerificationService,
	FindUserService,
	DeleteAccountService
]
