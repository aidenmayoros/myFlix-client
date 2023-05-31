import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default function MovieView({ movies }) {
	const { movieID } = useParams();
	const navigate = useNavigate();

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
				<Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
					<Button sx={{ mt: 5 }} variant='outlined' onClick={() => navigate('/')}>
						Back
					</Button>
				</Box>
			</Box>
			<Box sx={{ display: 'flex', width: '50%', justifyContent: 'center' }}>
				<img src={foundMovie.image} width={250} className='movie-view-selected-img' />
			</Box>
		</Container>
	);
}

// Define the prop types this component should have
// MovieView.propTypes = {
// 	movie: PropTypes.shape({
// 		image: PropTypes.string,
// 		title: PropTypes.string,
// 		description: PropTypes.string.isRequired,
// 		genre: PropTypes.shape({
// 			name: PropTypes.string,
// 		}),
// 		director: PropTypes.shape({
// 			name: PropTypes.string,
// 		}),
// 	}).isRequired,
// 	onBackClick: PropTypes.func.isRequired,
// };
