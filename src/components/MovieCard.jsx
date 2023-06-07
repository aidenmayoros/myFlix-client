import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import Grow from '@mui/material/Grow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box } from '@mui/material';

export default function MovieCard({ user, movie, backgroundColor }) {
	function isMovieAFavorite() {
		return user.FavoriteMovies.includes(movie.id);
	}

	return (
		<Grow in={true} appear={true} timeout={1000} style={{ transformOrigin: '0 0 0' }}>
			<Box>
				<CardActionArea>
					<Link to={`/movies/${encodeURIComponent(movie.id)}`}>
						<Card sx={{ height: 550, backgroundColor: backgroundColor }}>
							{isMovieAFavorite() ? (
								<FavoriteIcon sx={{ float: 'right', padding: 2, fontSize: 40, color: '#1976d2' }} />
							) : (
								<FavoriteBorderIcon sx={{ float: 'right', padding: 2, fontSize: 40 }} />
							)}
							<CardMedia
								sx={{ objectFit: 'contain', mt: 2 }}
								component='img'
								image={movie.image}
								height={250}
								alt='Movie banner'
							/>
							<CardContent>
								<Typography
									sx={{ width: '100%', justifyContent: 'center' }}
									gutterBottom
									variant='h5'
									component='div'>
									{movie.title}
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									{movie.description}
								</Typography>
							</CardContent>
						</Card>
					</Link>
				</CardActionArea>
			</Box>
		</Grow>
	);
}
