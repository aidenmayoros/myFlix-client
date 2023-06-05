import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MovieCard from './MovieCard';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router';

export default function SimilarMovies({ movies, setSelectedMovie }) {
	const { movieID } = useParams();
	const selectedMovie = movies.find((item) => item.id === movieID);

	let userFavorites = movies.filter((movie) => {
		return movie.genre.name === selectedMovie.genre.name;
	});

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<Typography sx={{ m: 1, width: '100%', textAlign: 'center' }} variant='h4'>
				Similar Movies
			</Typography>
			<Grid sx={{ mt: 1, justifyContent: 'center' }} width={'100%'} container>
				{similarMovies.map((movie, index) => (
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
