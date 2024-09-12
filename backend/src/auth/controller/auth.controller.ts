import { Body, Controller, Get, HttpException, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetUserQuery } from "../queries/query/get-user.query";
import { LoginFormDto } from "../dto/login.dto";
import { CreateUserCommand } from "../commands/command/create-user.command";
import { UserDto } from "../dto/user.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus
    ) {}

    @Get('login')
    login(
        @Body() body: LoginFormDto,
    ): Promise<{
        message: string,
        email: string
    }> {
        try{
            const query = new GetUserQuery(body)
            return this.queryBus.execute(query)
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

    @Post('create-account')
    async register(
        @Body() body: UserDto,
    ): Promise<{
        message: string,
        email: string
    }> {
        try{
            const command = new CreateUserCommand(body)
            return this.commandBus.execute(command)
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

    @Get('resend-email')
    async resendEmail(
        @Body() body: LoginFormDto,
    ): Promise<{
        message: string,
        email: string
    }> {
        try{
            const query = new GetUserQuery(body)
            return this.queryBus.execute(query)
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

    @Get('logout')
    async logout(
        @Body() body: LoginFormDto,
    ): Promise<{
        message: string,
        email: string
    }> {
        try{
            const query = new GetUserQuery(body)
            return this.queryBus.execute(query)
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

    @Get('refresh-token')
    async refreshToken(
        @Body() body: LoginFormDto,
    ): Promise<{
        message: string,
        email: string
    }> {
        try{
            const query = new GetUserQuery(body)
            return this.queryBus.execute(query)
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

    @Get('forgot-password')
    async forgotPassword(
        @Body() body: LoginFormDto,
    ): Promise<{
        message: string,
        email: string
    }> {
        try{
            const query = new GetUserQuery(body)
            return this.queryBus.execute(query)
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

    @Get('reset-password')
    async resetPassword(
        @Body() body: LoginFormDto,
    ): Promise<{
        message: string,
        email: string
    }> {
        try{
            const query = new GetUserQuery(body)
            return this.queryBus.execute(query)
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

    @Get('change-password')
    async changePassword(
        @Body() body: LoginFormDto,
    ): Promise<{
        message: string,
        email: string
    }> {
        try{
            const query = new GetUserQuery(body)
            return this.queryBus.execute(query)
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

    @Get('verify-email')
    async verifyEmail(
        @Body() body: LoginFormDto,
    ): Promise<{
        message: string,
        email: string
    }> {
        try{
            const query = new GetUserQuery(body)
            return this.queryBus.execute(query)
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

    

    
}