import { api } from './_api';

// GET /todos.json
export const get = async (event) => {
	const { locals } = event

	// request.locals.userid comes from src/hooks.js
	const response = await api(event, `todos/${locals.userid}`);

	if (response.status === 404) {
		// user hasn't created a todo list.
		// start with an empty array
		return { body: [] };
	}

	return response;
};

// POST /todos.json
export const post = async (event) => {
	const { request, locals } = event
	
	const formData = await request.formData()
	const response = await api(event, `todos/${locals.userid}`, {
		text: formData.get('text')
	});

	return response;
};
