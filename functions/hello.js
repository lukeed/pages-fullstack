export const onRequest = function (context) {
	return new Response('OK');
}

export const onRequestPost = function (context) {
	return new Response('I heard POST /hello request');
}
