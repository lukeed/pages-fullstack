// Runs on all HTTP methods
export const onRequest = async function (context) {
	try {
		// call the next function
		return await context.next();
	}	catch (err) {
		return new Response('Error', { status: 500 });
	}
}
