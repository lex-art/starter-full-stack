import { ResetPasswordDto } from '@app/auth/dto'
import { ProfileEntity, UserEntity } from '@app/auth/entities'
import { encrypt } from '@app/lib/utilities'
import { GeneralResponse } from '@app/types'
import { Injectable } from '@nestjs/common'
import { FullUserDto } from '../../dto/user.dot'

@Injectable()
export class UpdateUserService {
	async update(data: FullUserDto): Promise<GeneralResponse> {
		const user: UserEntity = await UserEntity.findOne({ where: { email: data.email } })
		for (const key in user) {
			if (Object.prototype.hasOwnProperty.call(data, key && key !== 'password') && data[key]) {
				const element = data[key]
				user[key] = element
			}
		}
		const profile: ProfileEntity = await ProfileEntity.findOne({
			where: {
				user: {
					idUser: user.idUser
				}
			}
		})
		for (const key in profile) {
			if (Object.prototype.hasOwnProperty.call(data, key) && data[key]) {
				const element = data[key]
				profile[key] = element
			}
		}

		await user.save()
		await profile.save()

		delete user.password

		return {
			message: 'User updated successfully',
			data: {
				user,
				profile
			}
		}
	}

	async changePassword(data: Pick<ResetPasswordDto, 'password' | 'email'>): Promise<GeneralResponse> {
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
