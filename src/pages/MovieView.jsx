import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import * as React from 'react';

export default function MovieView({ user, setUser, token, movies }) {
	const { movieID } = useParams();
	const foundMovie = movies.find((movie) => movie.id === movieID);

	if (!foundMovie) {
		return <Navigate to='/' />;
	}

	// This post request does not work with .post method of axios had to change to this format
	async function addMovieToFavorites() {
		await axios({
			method: 'post',
			url: `https://aidens-myflix-api.herokuapp.com/users/${user.Username}/movies/${movieID}`,
			headers: { Authorization: 'Bearer ' + token },
		})
			.then((response) => {
				alert('Movie added to favorites');
				setUser(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<Container sx={{ display: 'flex', justifyContent: 'space-between', p: 5 }} maxWidth={'100%'}>
			<Box sx={{ width: '40%' }}>
				<Typography variant='h4'>{foundMovie.title}</Typography>
				<Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							pt: 1,
							pb: 1,
						}}>
						<Typography sx={{ color: '#6c757d' }} variant='h5'>
							{foundMovie.director.name}
						</Typography>
						<Typography variant='overline'>{foundMovie.genre.name}</Typography>
					</Box>
					<Typography>{foundMovie.description}</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'end',
						alignItems: 'end',
					}}>
					<Button
						sx={{ mt: 2 }}
						variant='contained'
						size='small'
						onClick={() => addMovieToFavorites()}>
						Add to Favorites
					</Button>
				</Box>
			</Box>
			<Box sx={{ display: 'flex', width: '50%', justifyContent: 'center' }}>
				<img src={foundMovie.image} width={250} className='movie-view-selected-img' />
			</Box>
		</Container>
	);
}
