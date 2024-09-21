import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UserCommandHandlers } from './commands/handlers'
import { UpdateUserService } from './commands/services/update-user.service'
import { UserController } from './controllers/user.controller'
import { QueryUserHandler } from './queries/handlers'
import { UserQueryService } from './queries/services/user.service'

@Module({
	imports: [CqrsModule],
	providers: [...UserCommandHandlers, ...QueryUserHandler, UpdateUserService, UserQueryService],
	exports: [UpdateUserService],
	controllers: [UserController]
})
export class UserModule {}
