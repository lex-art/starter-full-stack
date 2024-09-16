import { ProfileDto } from '@app/auth/dto/profile.dto'
import { UserDto } from '@app/auth/dto/user.dto'
import { ProfileEntity } from '@app/auth/entities'
import { Injectable } from '@nestjs/common'
import { plainToClass } from 'class-transformer'

@Injectable()
export class GetUserService {
	constructor() {}

	async getUser(id: number): Promise<{
		profile: ProfileDto
		user: UserDto
	}> {
		const profile = await ProfileEntity.findOne({
			where: {
				idProfile: id
			},
			relations: {
				user: true
			}
		})
		const user = profile.user
		delete user.password
		delete profile.user
		return {
			profile: plainToClass(ProfileDto, profile),
			user: plainToClass(UserDto, user)
		}
	}
}
