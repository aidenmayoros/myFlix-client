import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import * as React from 'react';

export default function MovieView({ movies, handleAddToFavorites }) {
	const { movieID } = useParams();
	const foundMovie = movies.find((movie) => movie._id === movieID);
	const navigate = useNavigate();

	if (!foundMovie) {
		return <Navigate to='/' />;
	}

	async function handleAddFavoriteButton(movie) {
		await handleAddToFavorites(movie);
		navigate('/profile');
	}

	return (
		<Container
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				flexWrap: { xs: 'wrap-reverse', md: 'nowrap' },
				p: { xs: 2, md: 4 },
			}}
			maxWidth={'100%'}
			className='movie_container'>
			<Box
				sx={{
					width: '100%',
					p: 2,
				}}>
				<Typography
					sx={{
						display: 'flex',
						justifyContent: 'center',
						textAlign: 'center',
					}}
					variant='h4'>
					{foundMovie.Title}
				</Typography>
				<Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							flexDirection: { xs: 'column', sm: 'row' },
							alignItems: 'center',
							pt: 1,
							pb: 1,
						}}>
						<Typography sx={{ color: '#6c757d' }} variant='h5'>
							{foundMovie.Director.Name}
						</Typography>
						<Typography variant='overline'>{foundMovie.Genre.Name}</Typography>
					</Box>
					<Typography>{foundMovie.Description}</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'end',
						alignItems: 'end',
					}}>
					<Button
						sx={{ mt: 2, display: { xs: 'none', md: 'inherit' } }}
						variant='contained'
						size='small'
						onClick={() => handleAddFavoriteButton(foundMovie)}>
						Add to Favorites
					</Button>
				</Box>
			</Box>
			<Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
				<img src={foundMovie.ImagePath} width={250} className='movie-view-selected-img' />
			</Box>
		</Container>
	);
}
