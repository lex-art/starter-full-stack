import { ProfileDto, UserDto } from '@app/auth/dto'
import { IntersectionType } from '@nestjs/swagger'

export class FullUserDto extends IntersectionType(ProfileDto, UserDto) {}
