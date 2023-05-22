import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function MovieCard({ movie, onClick }) {
	return (
		<CardActionArea onClick={() => onClick(movie)}>
			<Card sx={{ height: 480 }}>
				<CardMedia sx={{ objectFit: 'contain' }} component='img' image={movie.image} height={250} alt='Movie banner' />
				<CardContent>
					<Typography sx={{ width: '100%', justifyContent: 'center' }} gutterBottom variant='h5' component='div'>
						{movie.title}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						{movie.description}
					</Typography>
				</CardContent>
			</Card>
		</CardActionArea>
	);
}
