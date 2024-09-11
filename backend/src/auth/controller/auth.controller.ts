import { Body, Controller, Get, HttpException } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { GetUserDto, GetUserQuery } from "../queries/implementation/get-user.query";

@Controller('auth')
export class ControllerController {
    constructor(
        private readonly queryBus: QueryBus
    ) {}

    @Get('login')
    login(
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

    @Get('resend-email')
    resendEmail(
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

    @Get('logout')
    logout(
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

    @Get('refresh-token')
    refreshToken(
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

    @Get('forgot-password')
    forgotPassword(
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

    @Get('reset-password')
    resetPassword(
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

    @Get('change-password')
    changePassword(
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

    @Get('verify-email')
    verifyEmail(
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