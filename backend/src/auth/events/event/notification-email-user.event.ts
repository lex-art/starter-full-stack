import { IEvent } from "@nestjs/cqrs";

export class UserCreatedEvent implements IEvent {
    constructor(public readonly userId: number, public readonly username: string) {}
  }