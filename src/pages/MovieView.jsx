import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import * as React from 'react';
import { MyFlixUrl } from '../utils/url';

export default function MovieView({ user, setUser, token, movies }) {
	const { movieID } = useParams();
	const foundMovie = movies.find((movie) => movie.id === movieID);

	if (!foundMovie) {
		return <Navigate to='/' />;
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
