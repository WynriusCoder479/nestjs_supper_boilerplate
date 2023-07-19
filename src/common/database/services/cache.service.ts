import { Inject, Injectable } from '@nestjs/common';
import { ICacheService } from '../interfaces';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService implements ICacheService {
	constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

	public async get(key: string): Promise<unknown> {
		return await this.cache.get(key);
	}

	public async set(key: string, value: unknown, ttl?: number): Promise<void> {
		await this.cache.set(key, value, ttl);
	}

	public async del(key: string): Promise<void> {
		await this.cache.del(key);
	}

	public async reset(key: string): Promise<void> {
		await this.cache.reset();
	}
}
