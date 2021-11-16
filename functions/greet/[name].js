export const onRequest = function (context) {
	return new Response(`Hello, ${context.params.name}`);
}
