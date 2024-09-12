import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserCreatedEvent } from "../event/notification-email-user.event";
import { EmailService } from "@app/mail";

@EventsHandler(UserCreatedEvent)
export class NotificationEmailUserHandler implements IEventHandler<UserCreatedEvent> {
    constructor(private readonly emailService: EmailService) {}

    async handle(event: UserCreatedEvent) {
        return this.emailService.sendEmail(event.username, 'Welcome to our platform!');
    }
}