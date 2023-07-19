import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
	@Query((_returns) => String)
	async hello(): Promise<string> {
		return 'Hello world';
	}
}
