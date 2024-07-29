import { IQuery } from '@nestjs/cqrs'
import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetUserDto {
    @IsEmail()
    email: string
}

export class GetUserQuery implements IQuery {
    constructor(public readonly body: GetUserDto ) {}
}