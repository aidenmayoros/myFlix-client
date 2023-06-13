console.log(process.env.NODE_ENV);

export const MyFlixUrl =
	process.env.NODE_ENV === 'development'
		? 'https://aidens-myflix-api.herokuapp.com/api'
		: 'http://localhost:8080/api';
