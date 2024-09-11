import { Module } from '@nestjs/common';
import { ControllerController } from './controller/user.controller';
import { QueryHandlers } from './queries/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity, UserEntity } from './entities';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([UserEntity, ProfileEntity]), 
        PassportModule,   
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
    controllers: [ControllerController],
    providers: [...QueryHandlers],
})
export class AuthModule {}
