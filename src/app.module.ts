import { Module } from '@nestjs/common';
import { ConfigModule } from '@common/config';
import { LoggerModule } from '@common/logger';
import { GraphModule } from '@common/graph';
import { AppResolver } from './app.resolver';
import { DatabaseModule } from '@common/database';

@Module({
	imports: [ConfigModule, LoggerModule, DatabaseModule, GraphModule],
	providers: [AppResolver],
})
export class AppModule {}
