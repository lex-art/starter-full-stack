import { LoginFormDto, UserDto } from '@app/auth/dto'
import { UserEntity } from '@app/auth/entities'
import { encrypt } from '@app/lib/utilities'
import { GeneralResponse } from '@app/types'
import { Injectable } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { FullUserDto } from '../../dto/user.dot'

@Injectable()
export class UpdateUserService {
	async update(data: FullUserDto): Promise<UserDto> {
		const user: UserEntity = await UserEntity.findOne({ where: { email: data.email, isActive: true } })
		for (const key in user) {
			if (Object.prototype.hasOwnProperty.call(data, key && key !== 'password') && data[key]) {
				const element = data[key]
				user[key] = element
			}
		}

		await user.save()

		delete user.password

		return {
			...plainToClass(UserDto, user)
		}
	}

	async changePassword(data: LoginFormDto): Promise<GeneralResponse> {
		const user: UserEntity = await UserEntity.findOne({ where: { email: data.email } })
		user.password = await encrypt(data.password)
		await user.save()
		return {
			message: 'User updated successfully',
			data: {
				user: user.email
			}
		}
	}
}
