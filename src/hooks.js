import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';

export const handle = async ({ event, resolve }) => {
	const { request, locals } = event
	const cookies = cookie.parse(request.headers.get('cookie') || '');
	
	locals.userid = cookies.userid || uuid();

	const response = await resolve(event);

	if (!cookies.userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers.set('set-cookie', cookie.serialize('userid', locals.userid, {
			path: '/',
			httpOnly: true
		}));
	}

	return response;
};
