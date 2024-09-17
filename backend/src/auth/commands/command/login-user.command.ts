import { LoginFormDto } from "@app/auth/dto/login.dto";
import { ICommand } from "@nestjs/cqrs";

export class LoginUserCommand implements ICommand {
  constructor(public readonly body: LoginFormDto) {}
}