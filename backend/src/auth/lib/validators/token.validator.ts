import { VerificationTokenEntity } from '@app/auth/entities'

const tokenValidator = {
	token_not_found: (token: VerificationTokenEntity) => !token,
	token_expired: (token: VerificationTokenEntity) => token.expires < new Date(),
	token_used: (token: VerificationTokenEntity) => token.isUsed,
	token_user_mismatch: (tokenEntity: VerificationTokenEntity, token: string) => tokenEntity.token !== token
}

export { tokenValidator }
