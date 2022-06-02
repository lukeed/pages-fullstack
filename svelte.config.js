import cloudflare from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: cloudflare(),
		methodOverride: {
			parameter: '_method',
			allowed: ['PUT', 'PATCH', 'DELETE']
		}
	}
};

export default config;
