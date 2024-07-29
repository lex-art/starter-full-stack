import { Module } from '@nestjs/common';
import { ControllerController } from './controller/controller.controller';
import { QueryHandlers } from './queries/handlers';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [CqrsModule],
    controllers: [ControllerController],
    providers: [...QueryHandlers],
})
export class AuthModule {}
