import { Body, Controller, Get, HttpException, Post, Put } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserDto, GetUserQuery } from '../queries/implementation/get-user.query';

@Controller('auth')
export class ControllerController {
    constructor(
        private readonly queryBus: QueryBus
    ) {}

    @Post('create-account')
    register(
        @Body() body: GetUserDto,
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

    @Get('user-account')
    getUser(
        @Body() body: GetUserDto,
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

    @Get('all-accounts')
    getAllUsers(
        @Body() body: GetUserDto,
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

    @Put('update-account')
    update(
        @Body() body: GetUserDto,
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

    @Get('delete-account')
    delete(
        @Body() body: GetUserDto,
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
