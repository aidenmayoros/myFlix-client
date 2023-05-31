import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MovieCard from './MovieCard';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

export default function SimilarMovies({ movies }) {
	const { movieID } = useParams();
	const selectedMovie = movies.find((item) => item.id === movieID);
	const navigate = useNavigate();

	let similarMovies = movies.filter((movie) => {
		return movie.id !== movieID;
	});

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<Typography sx={{ m: 1, width: '100%', textAlign: 'center' }} variant='h4'>
				Similar Movies
			</Typography>
			<Grid sx={{ mt: 1, justifyContent: 'center' }} width={'100%'} container>
				{similarMovies.map((movie, index) => (
					<Grid sx={{ m: 1 }} item xs={6} md={4} xl={2} key={index}>
						<MovieCard movie={movie} backgroundColor={'#dbdbdb'} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
