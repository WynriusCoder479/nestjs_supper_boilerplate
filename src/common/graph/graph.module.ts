import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { IAppConfig } from '../config/interfaces';
import { APP_CONFIG } from '../config/data';
import { join } from 'path';
import { upperDirectiveTransformer } from './direactives';
import { DirectiveLocation, GraphQLDirective } from 'graphql';

@Module({
	imports: [
		GraphQLModule.forRootAsync<ApolloDriverConfig>({
			inject: [ConfigService],
			driver: ApolloDriver,
			useFactory: (configService: ConfigService) => {
				const appConfig = configService.get<IAppConfig>(APP_CONFIG);

				return {
					autoSchemaFile: join(process.cwd(), appConfig.graphPath),
					transformSchema: (schema) =>
						upperDirectiveTransformer(schema, 'upper'),
					buildSchemaOptions: {
						directives: [
							new GraphQLDirective({
								name: 'upper',
								locations: [DirectiveLocation.FIELD_DEFINITION],
							}),
						],
					},
				};
			},
		}),
	],
})
export class GraphModule {}
