export const MyFlixUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:8080/api'
		: 'https://aidens-myflix-api.herokuapp.com/api';
