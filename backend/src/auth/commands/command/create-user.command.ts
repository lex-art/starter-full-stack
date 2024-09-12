import { ICommand } from "@nestjs/cqrs";
import { UserDto } from "../../../auth/dto/user.dto";

export class CreateUserCommand implements ICommand {
    constructor(public readonly body: UserDto) {}
}