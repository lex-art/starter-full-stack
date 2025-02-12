import { AuthResponseDto } from '@app/auth/dto/auth-response.dto'
import { LoginFormDto } from '@app/auth/dto/login.dto'
import { AccountDto, CurrentUserDto, ProfileDto, UserDto } from '@app/auth/dto/main-user.dto'
import { UserEntity } from '@app/auth/entities'
import { AuthException } from '@app/auth/exceptions'
import { userValidator } from '@app/auth/lib/validators/user.validator'
import { configuration } from '@app/config/configuration'
import { CryptoUtility, compare } from '@app/lib/utilities'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { plainToClass } from 'class-transformer'
import { FindOptionsWhere } from 'typeorm'

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly _crypto: CryptoUtility
	) {}

	async loginUser(data: Omit<AuthResponseDto, 'accessToken' | 'refreshToken'>): Promise<AuthResponseDto> {
		const payload: CurrentUserDto = {
			userId: data.user.userId,
			email: data.user.email,
			accountId: data.auth.accountId,
			profileId: data.profile.profileId,
			verified: data.user.verified
		}
		const accessToken = this.jwtService.sign(payload, {
			expiresIn: configuration.jwt.signOptions.expiresIn
		})

		const refreshToken = this.jwtService.sign(payload, {
			expiresIn: configuration.jwt.signOptions.expiresIn,
			secret: configuration.jwt.secret
		})

		const { profile, account, ...user } = plainToClass(UserDto, data.user)
		return {
			accessToken,
			refreshToken,
			user,
			profile,
			auth: account[0] // if you want to use multiple accounts, you should change this
		}
	}

	async generateVerificationUser(
		data: Omit<AuthResponseDto, 'accessToken' | 'refreshToken'>
	): Promise<Omit<AuthResponseDto, 'auth'>> {
		const payload = {
			userId: data.user.userId,
			email: data.user.email,
			verified: data.user.verified
		}
		const accessToken = this.jwtService.sign(payload, {
			expiresIn: configuration.jwt.expiresVerifyIn
		})

		const refreshToken = ''

		const { profile, ...user } = plainToClass(UserDto, data.user)
		delete user.account
		return {
			accessToken,
			refreshToken,
			user,
			profile
			//auth: account[0] // if you want to use multiple accounts, you should change this
		}
	}

	async validateLocalUser({
		email,
		password,
		provider,
		skipVerification = false
	}: LoginFormDto & {
		skipVerification?: boolean
	}): Promise<{
		user: UserDto
		profile: ProfileDto
		auth: AccountDto
	}> {
		const where: FindOptionsWhere<UserEntity> = { email: this._crypto.encryptData(email) }

		if (provider) {
			where.account = { provider }
		}
		const user = await UserEntity.findOne({
			where,
			select: {
				isActive: true,
				userId: true,
				email: true,
				username: true,
				verified: true,
				timeZone: true,
				password: true,
				account: {
					accountId: true,
					provider: true,
					role: true,
					type: true,
					permissions: true,
					createdAt: true
				},
				profile: {
					profileId: true,
					firstName: true,
					lastName: true,
					phone: true,
					address: true,
					countryCallingCode: true,
					countryCode: true,
					createdAt: true,
					image: true
				}
			},
			relations: {
				account: true,
				profile: true
			}
		})

		if (skipVerification) {
			delete userValidator.user_not_verified
		}
		const error = Object.entries(userValidator).find(([, validator]) => validator(user))
		if (error) {
			const [key] = error
			throw new AuthException(key, key.toUpperCase())
		}
		const isMatchPassword = await compare(password, user.password)
		if (!isMatchPassword) {
			throw new AuthException('Invalid password', 'INVALID_PASSWORD')
		}
		return {
			user: plainToClass(UserDto, user),
			profile: plainToClass(ProfileDto, user.profile),
			auth: plainToClass(AccountDto, user.account[0]) //if you want to use multiple accounts, you should change this
		}
	}
}
