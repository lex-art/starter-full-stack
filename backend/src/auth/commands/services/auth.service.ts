import { LoginFormDto } from '@app/auth/dto/login.dto'
import { ProfileDto } from '@app/auth/dto/profile.dto'
import { UserDto } from '@app/auth/dto/user.dto'
import { ProfileEntity, UserEntity } from '@app/auth/entities'
import { compare } from '@app/lib/utilities'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { instanceToPlain, plainToClass } from 'class-transformer'

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async loginUser(data: UserDto & ProfileDto): Promise<{
		message: string
		data: {
			token: string
			refreshToken: string
		}
	}> {
		const user: UserEntity = plainToClass(UserEntity, data)

		const payload: Record<string, unknown> = instanceToPlain(user)
		const token = this.jwtService.sign(payload, {
			expiresIn: this.configService.get('JWT_EXPIRATION_TIME')
		})

		const refreshToken = this.jwtService.sign(payload, {
			expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')
		})

		return {
			message: 'Login successful',
			data: {
				token,
				refreshToken
			}
		}
	}

	async validateUser({ email, password }: LoginFormDto): Promise<UserDto & ProfileDto> {
		const user = await UserEntity.findOne({
			where: { email }
		})
		if (!user) {
			return null
		}
		const isMatchPassword = await compare(password, user.password)
		if (!isMatchPassword) {
			return null
		}

		const profile = await ProfileEntity.findOneBy({
			user: {
				idUser: user.idUser
			}
		})

		if (!profile) {
			return null
		}
		delete user.password

		return {
			...plainToClass(UserDto, user),
			...plainToClass(ProfileDto, profile)
		}
	}
}