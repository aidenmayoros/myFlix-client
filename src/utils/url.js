export const MyFlixUrl =
	process.env.NODE_ENV === 'development'
		? 'https://aidens-myflix-api.herokuapp.com'
		: 'http://localhost:8080';
