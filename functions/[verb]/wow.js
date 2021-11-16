export const onRequestPost = async function (context) {
	try {
		var input = await context.request.text();
		let msg = `Wow, you ${context.params.verb} really ${input}`;
		return new Response(msg);
	} catch (err) {
		return new Response('Oops');
	}
}
