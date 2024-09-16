import { ProfileEntity, UserEntity } from "@app/auth/entities";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDto } from '@app/auth/dto/user.dto';
import { ProfileDto } from '@app/auth/dto/profile.dto';
import { AuthException } from "@app/auth/exceptions";
import { encrypt } from "@app/lib/utilities";

@Injectable()
export class CreateUserService {
    private readonly logger = new Logger(CreateUserService.name)
    
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {
        
    }
    

    async createUser(body: UserDto & ProfileDto ): Promise<{ user: UserEntity, profile: ProfileEntity }> {
        
        return await this.userRepository.manager.transaction(async transactionalEntityManager => {
            const user = new UserEntity()
            user.email = body.email
            user.password = body.password
            user.rol = body.rol
            user.type = body.type
            user.permissions = body.permissions
            user.userName = body.userName
            user.timeZone = body.timeZone
            user.password = await encrypt(body.password)

            const profile = new ProfileEntity()
            profile.firstName = body.firstName
            profile.lastName = body.lastName
            profile.user = user
            profile.phone = body.phone
            profile.countryCode = body.countryCode
            profile.countryCallingCode = body.countryCallingCode
            profile.birthDate = body.birthDate
            profile.address = body.address
            profile.imgProfile = body.imgProfile

            await transactionalEntityManager.save(user)
            await transactionalEntityManager.save(profile) 
            return {
                user,
                profile
            }
        }).catch(error => {
            this.logger.error(error)
            throw new AuthException('Error creating user', 'ERROR_CREATING_USER')
        })
    }
}