import { Module } from '@nestjs/common';
import { ConfigModule as EnvModule } from '@nestjs/config';
import { AppConfig, DatabaseConfig, LoggerConfig, MailerConfig } from './data';
import { validationOptions, validationSchema } from './validator';

@Module({
	imports: [
		EnvModule.forRoot({
			isGlobal: true,
			expandVariables: true,
			cache: true,
			envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
			load: [AppConfig, DatabaseConfig, LoggerConfig, MailerConfig],
			validationSchema,
			validationOptions,
		}),
	],
})
export class ConfigModule {}
