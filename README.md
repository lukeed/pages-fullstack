# SvelteKit example with Cloudflare Pages

This is the demo application created by the `npm init svelte@next` command. The only change is that [`@sveltejs/adapter-cloudflare`](https://www.npmjs.com/package/@sveltejs/adapter-cloudflare) has been installed and attached to the `svelte.config.js` file.

## Pages Deployment

Cloudflare Pages automatically deploys this repository.

Here are the settings for the Pages project:

- **Framework preset** – None
- **Build command** – `npm run build`
- **Build output directory** – `.svelte-kit/cloudflare`
- **Environment variables**
  - `NODE_VERSION` :: `16`

## Development

As with any SvelteKit application, you can run `npm run dev` for SvelteKit's local development experience.

Refer to [the SvelteKit documentation](https://kit.svelte.dev/) for any additional information.
