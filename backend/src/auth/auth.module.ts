import { Module, ValidationPipe } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { QueryHandlers } from './queries/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity, UserEntity } from './entities';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { CommandHandlers } from './commands/handlers';
import { EventsHandlers } from './events/handlers';
import { MailModule } from '@app/mail';
import { JwtStrategy } from './strategy/jwt.strategy';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { RolesGuard } from './guard/role.guard';
import { TypeUserGuard } from './guard/type-user.guard';
import { AuthGuard } from './guard/auth.guard';
import { UserSubscriber } from './encrypt/user.suscriber';
import { CryptoUtility } from '@app/lib/utilities';

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([UserEntity, ProfileEntity]), 
        PassportModule,   
        MailModule,
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION_IN') }
        }),
        inject: [ConfigService]
    })],
    controllers: [UserController, AuthController],
    providers: [
        ...QueryHandlers, 
        ...CommandHandlers,
        ...EventsHandlers, 
        JwtStrategy,
        CryptoUtility,
        UserSubscriber,
        {
			provide: APP_GUARD, // this is to use global guard
			useClass: AuthGuard
		},
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        },
        {
			provide: APP_GUARD,
			useClass: TypeUserGuard
		},
		{
			provide: APP_PIPE,
			useClass: ValidationPipe
		}
    ],
    exports:[PassportModule, JwtStrategy]
})
export class AuthModule {}
