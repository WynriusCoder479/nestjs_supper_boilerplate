declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production' | 'provision' | 'testing';
			PORT: string;
			API_VERSION: string;
			GRAPHQL_SCHEMA_FILE_PATH: string;
		}
	}
}

export {};
