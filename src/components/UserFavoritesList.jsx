import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MovieCard from './MovieCard';
import Grid from '@mui/material/Grid';

export default function UserFavoritesList({ user, movies, setSelectedMovie }) {
	let favoriteMovies = movies.filter((movie) => {
		return user.FavoriteMovies.includes(movie.id);
	});

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<Typography sx={{ m: 1, width: '100%', textAlign: 'center' }} variant='h4'>
				Favorite Movies
			</Typography>
			<Grid sx={{ mt: 1, justifyContent: 'center' }} width={'100%'} container>
				{favoriteMovies.map((movie, index) => (
					<Grid sx={{ m: 1 }} item xs={6} md={4} xl={2} key={index}>
						<MovieCard
							movie={movie}
							backgroundColor={'#dbdbdb'}
							setSelectedMovie={setSelectedMovie}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
