import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { UserCreatedEvent } from "@app/auth/events/event/notification-email-user.event";
import { CreateUserCommand } from "../command/create-user.command";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    private readonly logger = new Logger(CreateUserHandler.name)
    constructor(
        private readonly eventBus: EventBus
    ) {}

    async execute(command: CreateUserCommand) {
        try{
            console.log('====================================')
            console.log(command)
            console.log('====================================')
            const id = 1
            this.eventBus.publish(new UserCreatedEvent(id, command.body.email))
            return {
                message: 'Create user command executed',
                email: command.body.email
            };
        } catch (error) {
            this.logger.error(error.message)
            throw new Error('Error creating user =>' +  error.message)
        }
    }
}