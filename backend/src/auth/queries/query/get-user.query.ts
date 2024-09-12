import { IQuery } from '@nestjs/cqrs'
import { LoginFormDto } from '../../../auth/dto/login.dto';

export class GetUserQuery implements IQuery {
    constructor(public readonly body: LoginFormDto ) {}
}