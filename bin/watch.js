import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { Miniflare } from 'miniflare';
import laccess from 'local-access';
import { watch } from 'watchlist';
import { lookup } from 'mrmime';

const { PORT=3000 } = process.env;
process.env.DEV = '1';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// svelte-kit build output
const OUTPUT = join(__dirname, '../.svelte-kit/cloudflare');
const SOURCE = join(__dirname, '../src');

function rebuild() {
	console.log('\n~> rebuild <~');
	let pid = spawnSync('npm', ['run', 'build'], { stdio: 'inherit' });
	if (pid.status) throw new Error('build error');
}

/**
 * @type {import('miniflare').MiniflareOptions}
 */
const config = {
	watch: true,
	modules: true,
	scriptPath: '.svelte-kit/cloudflare/_worker.js',
	bindings: {
		ASSETS: {
			async fetch(req) {
				try {
					let { pathname } = new URL(req.url);
					let path = join(OUTPUT, pathname);

					let exists = existsSync(path);
					if (!exists) return new Response('Missing', { status: 404 });

					let buff = await readFile(path);
					return new Response(buff, {
						headers: {
							'Content-Type': lookup(pathname)
						}
					});
				} catch (err) {
					console.error('[ERROR] Error with request proxy', err);
					return new Response(`[ERROR] Error with request proxy: ${String(err)}`, { status: 502 });
				}
			},
		}
	}
};

// initial build & watch for changes
await watch([SOURCE], rebuild, { eager: true });

const ctx = new Miniflare(config);
const globals = await ctx.getGlobalScope();
const { Response } = globals;

// start workers-proxy dev server
await ctx.createServer().then(server => {
	server.listen(PORT, () => {
		let addr = server.address();
		console.log('listening on', laccess(addr));
	});
});
