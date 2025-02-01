import { AuthResponseDto } from '@app/auth/dto/auth-response.dto'
import { LoginFormDto } from '@app/auth/dto/login.dto'
import { AccountDto, CurrentUserDto, ProfileDto, UserDto } from '@app/auth/dto/main-user.dto'
import { UserEntity } from '@app/auth/entities'
import { AuthException } from '@app/auth/exceptions'
import { userValidator } from '@app/auth/lib/validators/user.validator'
import { compare } from '@app/lib/utilities'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { plainToClass } from 'class-transformer'
import { FindOptionsWhere } from 'typeorm'

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async loginUser(data: Omit<AuthResponseDto, 'accessToken' | 'refreshToken'>): Promise<AuthResponseDto> {
		const payload: CurrentUserDto = {
			userId: data.user.userId,
			accountId: data.auth.accountId,
			profileId: data.profile.profileId,
			verified: data.user.verified
		}
		const accessToken = this.jwtService.sign(payload, {
			expiresIn: this.configService.get('JWT_EXPIRATION_TIME')
		})

		const refreshToken = this.jwtService.sign(payload, {
			expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
			secret: this.configService.get<string>('JWT_REFRESH_SECRET')
		})

		return {
			accessToken,
			refreshToken,
			...data
		}
	}

	async validateLocalUser({ email, password, provider }: LoginFormDto): Promise<{
		user: UserDto
		profile: ProfileDto
		auth: AccountDto
	}> {
		const where: FindOptionsWhere<UserEntity> = { email }

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
