import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function MovieView({ movie, onBackClick }) {
	return (
		<Container sx={{ display: 'flex', justifyContent: 'space-between', p: 5 }} maxWidth={'100%'}>
			<Box sx={{ width: '40%' }}>
				<Typography variant='h4'>{movie.title}</Typography>
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
							{movie.director.name}
						</Typography>
						<Typography variant='overline'>{movie.genre.name}</Typography>
					</Box>
					<Typography>{movie.description}</Typography>
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
					<Button sx={{ mt: 5 }} variant='outlined' onClick={onBackClick}>
						Back
					</Button>
				</Box>
			</Box>
			<Box sx={{ display: 'flex', width: '50%', justifyContent: 'center' }}>
				<img src={movie.image} width={250} className='movie-view-selected-img' />
			</Box>
		</Container>
	);
}

// Define the prop types this component should have
MovieView.propTypes = {
	movie: PropTypes.shape({
		image: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string.isRequired,
		genre: PropTypes.shape({
			name: PropTypes.string,
		}),
		director: PropTypes.shape({
			name: PropTypes.string,
		}),
	}).isRequired,
	onBackClick: PropTypes.func.isRequired,
};
