import { PickType } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'
import { AccountDto, ProfileDto, UserDto } from './main-user.dto'

class AuthDto extends PickType(AccountDto, ['accountId', 'role', 'type', 'permissions']) {}

export class AuthResponseDto {
	@IsString()
	@IsNotEmpty()
	accessToken: string

	@IsString()
	@IsNotEmpty()
	refreshToken: string

	@Transform(({ value }) => {
		if (value && typeof value === 'object' && 'userId' in value) {
			return { ...value, id: value.userId, userId: undefined }
		}
		return value
	})
	user: Omit<UserDto, 'password' | 'profile' | 'account'>

	@Transform(({ value }) => {
		if (value && typeof value === 'object' && 'profileId' in value) {
			return { ...value, id: value.profileId, profileId: undefined }
		}
		return value
	})
	profile: ProfileDto

	@Transform(({ value }) => {
		if (value && typeof value === 'object' && 'accountId' in value) {
			return { ...value, id: value.accountId, accountId: undefined }
		}
		return value
	})
	auth: AuthDto

	/**
	 * this property use when you want to use multiple accounts
	 *  */
	/* @Transform(({ value }) => {
		if (value && typeof value === 'object' && 'accountId' in value) {
			return { ...value, id: value.accountId, accountId: undefined }
		}
		return value
	})
	linkedAuthMethods?: AuthDto[] */
}
