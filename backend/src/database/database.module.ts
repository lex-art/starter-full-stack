import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { configuration } from '../config/configuration'
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async () => ({
				...configuration.db
			})
		})
	],
	exports: [TypeOrmModule]
})
export class DatabaseModule {}
