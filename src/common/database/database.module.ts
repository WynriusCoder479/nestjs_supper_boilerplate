import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IDatabaseConfig } from '@common/config/interfaces';
import { DATABASE_CONFIG } from '@common/config/data';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { CACHE_SERVICE } from '.';
import { CacheService } from './services';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				const databaseConfig =
					configService.get<IDatabaseConfig>(DATABASE_CONFIG);

				return {
					dbName: databaseConfig.mongo.dbName,
					uri: databaseConfig.mongo.dbUrl,
				};
			},
		}),

		CacheModule.registerAsync({
			inject: [ConfigService],
			isGlobal: true,
			useFactory: async (configService: ConfigService) => {
				const databaseConfig =
					configService.get<IDatabaseConfig>(DATABASE_CONFIG);

				return {
					store: await redisStore({
						url: databaseConfig.redis.url,
					}),
					isGlobal: true,
				};
			},
		}),
	],
	providers: [
		{
			provide: CACHE_SERVICE,
			useClass: CacheService,
		},
	],
	exports: [
		{
			provide: CACHE_SERVICE,
			useClass: CacheService,
		},
	],
})
export class DatabaseModule {}
