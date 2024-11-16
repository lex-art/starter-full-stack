import { LoginFormDto } from '@app/auth/dto/login.dto'
import { CurrentUserDto, UserDto } from '@app/auth/dto/main-user.dto'
import { UserEntity } from '@app/auth/entities'
import { AuthException } from '@app/auth/exceptions'
import { compare } from '@app/lib/utilities'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { plainToClass } from 'class-transformer'

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async loginUser(data: UserDto): Promise<{
		accessToken: string
		refreshToken: string
		user: UserDto
	}> {
		const payload: CurrentUserDto = {
			userId: data.userId,
			email: data.email,
			accountId: data.account.accountId,
			profileId: data.account.profile.profileId,
			role: data.account.role,
			permissions: data.account.permissions,
			type: data.account.type,
			verified: data.verified
		}
		const accessToken = this.jwtService.sign(payload, {
			expiresIn: this.configService.get('JWT_EXPIRATION_TIME')
		})

		const refreshToken = this.jwtService.sign(payload, {
			expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
			secret: this.configService.get('JWT_REFRESH_SECRET')
		})

		return {
			accessToken,
			refreshToken,
			user: data
		}
	}

	async validateLocalUser({ email, password }: LoginFormDto): Promise<UserDto> {
		const user = await UserEntity.findOne({
			where: { email },
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
					createdAt: true,
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
				}
			},
			relations: {
				account: {
					profile: true
				}
			}
		})

		const isMatchPassword = await compare(password, user.password)
		if (!isMatchPassword) {
			throw new AuthException('Invalid password', 'INVALID_PASSWORD')
		}

		const validators = {
			user_not_exist: (user: UserEntity) => !user,
			account_not_exist: (user: UserEntity) => !user.account.length,
			user_not_verified: (user: UserEntity) => user.verified // change this when you have a verification system
		}

		const error = Object.entries(validators).find(([, validator]) => validator(user))
		if (error) {
			const [key] = error
			throw new AuthException(key, key.toUpperCase())
		}
		delete user.password
		return plainToClass(UserDto, {
			...user,
			account: user.account[0]
		})
	}
}
