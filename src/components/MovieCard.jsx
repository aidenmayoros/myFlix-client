import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grow from '@mui/material/Grow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';

export default function MovieCard({
	user,
	movie,
	backgroundColor,
	handleRemoveFromFavorites,
	handleAddToFavorites,
}) {
	const navigate = useNavigate();
	const usersFavoriteMovies = user.FavoriteMovies.map((movie) => movie._id);
	const [isLoading, setIsLoading] = useState(false);

	function isMovieAFavorite() {
		return usersFavoriteMovies.includes(movie._id);
	}

	async function handleRemove(movie) {
		setIsLoading(true);
		await handleRemoveFromFavorites(movie);
		setIsLoading(false);
	}

	async function handleAdd(movie) {
		setIsLoading(true);
		await handleAddToFavorites(movie);
		setIsLoading(false);
	}

	function renderHeartIcon() {
		if (isLoading) {
			return <CircularProgress />;
		}

		if (isMovieAFavorite()) {
			return (
				<FavoriteIcon
					sx={{ fontSize: { xs: 30, md: 40 }, color: '#e61919', cursor: 'pointer' }}
					onClick={() => handleRemove(movie)}
				/>
			);
		}
		return (
			<FavoriteBorderIcon
				sx={{ fontSize: { xs: 30, md: 40 }, cursor: 'pointer' }}
				onClick={() => handleAdd(movie)}
			/>
		);
	}

	return (
		<Grow in={true} appear={true} timeout={1000} style={{ transformOrigin: '0 0 0' }}>
			<Card sx={{ backgroundColor: backgroundColor, width: { xs: '100%' } }}>
				<CardActions sx={{ float: 'right', p: 2 }}>{renderHeartIcon()}</CardActions>
				<CardActionArea
					sx={{ height: 400 }}
					onClick={() => navigate(`/movies/${encodeURIComponent(movie._id)}`)}>
					<CardMedia
						sx={{ objectFit: 'contain', mt: 2 }}
						component='img'
						image={movie.ImagePath}
						height={250}
						width={200}
						alt='Movie banner'
					/>
					<CardContent>
						<Typography
							sx={{ width: '100%', justifyContent: 'center' }}
							gutterBottom
							variant='h5'
							component='div'>
							{movie.Title}
						</Typography>
						<Typography
							sx={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitLineClamp: '3',
								WebkitBoxOrient: 'vertical',
							}}
							variant='body2'
							color='text.secondary'>
							{movie.Description}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grow>
	);
}
