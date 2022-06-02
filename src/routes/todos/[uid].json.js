import { api } from './_api';

// PATCH /todos/:uid.json
export const patch = async (event) => {
	const { request, params, locals } = event
	const formData = await request.formData()

	return api(event, `todos/${locals.userid}/${params.uid}`, {
		text: formData.has('text') ? formData.get('text') : undefined,
		done: formData.has('done') ? !!formData.get('done') : undefined
	});
};

// DELETE /todos/:uid.json
export const del = async (event) => {
	const { params, locals } = event

	return api(event, `todos/${locals.userid}/${params.uid}`);
};
