import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MovieCard from './MovieCard';
import Grid from '@mui/material/Grid';

export default function UserFavoritesList({
	user,
	handleRemoveFromFavorites,
	handleAddToFavorites,
}) {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<Typography sx={{ m: 1, width: '100%', textAlign: 'center' }} variant='h4'>
				Favorite Movies
			</Typography>
			<Grid sx={{ mt: 1, justifyContent: 'center' }} width={'100%'} container>
				{user.FavoriteMovies.map((movie, index) => (
					<Grid sx={{ m: 1 }} item xs={12} sm={6} md={4} xl={2} key={index}>
						<MovieCard
							user={user}
							movie={movie}
							backgroundColor={'#dbdbdb'}
							handleRemoveFromFavorites={handleRemoveFromFavorites}
							handleAddToFavorites={handleAddToFavorites}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
