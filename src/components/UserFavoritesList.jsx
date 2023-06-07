import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MovieCard from './MovieCard';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UserFavoritesList({ user, token, movies }) {
	const [favoriteMovies, setFavoriteMovies] = useState([]);

	// Grab users favorites from server and store in state
	async function getUsersFavorites() {
		await axios
			.get(`https://aidens-myflix-api.herokuapp.com/users/${user.Username}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				setFavoriteMovies(
					movies.filter((movie) => response.data.FavoriteMovies.includes(movie.id))
				);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	// Delete movie from users favorites and then re-render with new favorite list from server
	async function handleRemoveFromFavorites(movie) {
		await axios
			.delete(`https://aidens-myflix-api.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				alert('Delete Success');
				getUsersFavorites();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		getUsersFavorites();
	}, []);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<Typography sx={{ m: 1, width: '100%', textAlign: 'center' }} variant='h4'>
				Favorite Movies
			</Typography>
			<Grid sx={{ mt: 1, justifyContent: 'center' }} width={'100%'} container>
				{favoriteMovies.map((movie, index) => (
					<Grid sx={{ m: 1 }} item xs={6} md={4} xl={2} key={index}>
						<MovieCard user={user} movie={movie} backgroundColor={'#dbdbdb'} />
						<Button
							sx={{ float: 'right', mt: 1 }}
							variant='outlined'
							color='error'
							startIcon={<DeleteIcon />}
							onClick={() => handleRemoveFromFavorites(movie)}>
							Remove
						</Button>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
