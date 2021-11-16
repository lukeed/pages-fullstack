// import cloudflare from '@sveltejs/adapter-cloudflare';
import cloudflare from './adapter-cloudflare/index.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: cloudflare(),
	}
};

export default config;
