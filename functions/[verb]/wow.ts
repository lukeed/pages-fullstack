// POST /:verb/wow
export const onRequestPost = async function (context) {
	let input = await context.request.text();
	let msg = `Wow, you ${context.params.verb} really ${input}`;
	return new Response(msg);
}
