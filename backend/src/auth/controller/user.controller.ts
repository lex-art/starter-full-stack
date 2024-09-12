import { Body, Controller, Get, HttpException, Post, Put } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from '../queries/query/get-user.query';
import { LoginFormDto } from '../dto/login.dto';

@Controller('auth')
export class UserController {
    constructor(
        private readonly queryBus: QueryBus
    ) {}

    @Post('create-user')
    register(
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

    @Get('user')
    getUser(
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

    @Get('all-users')
    getAllUsers(
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

    @Put('update-user')
    update(
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

    @Get('delete-user')
    delete(
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
