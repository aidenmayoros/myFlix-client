import { useEffect, useState } from 'react';
import MenuAppBar from './Navigation';
import SimilarMovies from './similarMovies';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MovieCard from './MovieCard';
import MovieView from './MovieView';

function MainView() {
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);

	async function fetchMovies() {
		try {
			const fetchedData = await fetch('https://aidens-myflix-api.herokuapp.com/movies');
			const jsonData = await fetchedData.json();
			const movies = jsonData.map((movie) => {
				return {
					id: movie._id,
					title: movie.Title,
					image: movie.ImagePath,
					description: movie.Description,
					actors: movie.Actors,
					genre: {
						name: movie.Genre.Name,
						description: movie.Genre.Description,
					},
					director: {
						name: movie.Director.Name,
						bio: movie.Director.Bio,
					},
				};
			});

			setMovies(movies);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchMovies();
	}, []);

	// Display selected movie details and similar movie cards
	function displayMovieView() {
		return (
			<>
				<Container maxWidth={'100%'}>
					<MovieView
						movie={selectedMovie}
						onBackClick={() => {
							setSelectedMovie(null);
						}}
					/>
					<SimilarMovies movies={movies} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
				</Container>
			</>
		);
	}

	function displayMovieCardList() {
		return (
			<Grid sx={{ mt: 1, justifyContent: 'center' }} width={'100%'} container>
				{movies.map((movie, index) => (
					<Grid sx={{ m: 2 }} item xs={6} md={4} xl={2} key={index}>
						<MovieCard
							key={movie.id}
							movie={movie}
							onClick={(newSelectedMovie) => {
								setSelectedMovie(newSelectedMovie);
							}}
						/>
					</Grid>
				))}
			</Grid>
		);
	}

	// Display MovieView if there is a selected movie, and display MovieCard list if there is none selected.
	return (
		<>
			<MenuAppBar />
			{selectedMovie ? displayMovieView() : movies.length ? displayMovieCardList() : <div>The Movie list is empty!</div>}
		</>
	);
}

export default MainView;
