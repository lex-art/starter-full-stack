import { ICommand } from "@nestjs/cqrs";
import { UserDto } from "../../../auth/dto/user.dto";
import { ProfileDto } from "@app/auth/dto/profile.dto";

export class CreateUserCommand implements ICommand {
    constructor(public readonly body: UserDto & ProfileDto) {}
}