import cloudflare from '@sveltejs/adapter-cloudflare';

const isDev = !!process.env.DEV;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: cloudflare(),
		vite: {
			build: {
				minify: !isDev,
			}
		}
	}
};

export default config;
