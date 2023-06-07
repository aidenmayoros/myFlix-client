import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import SimilarMovies from '../components/similarMovies';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MovieCard from '../components/MovieCard';
import MovieView from './MovieView';
import LoginVeiw from './LoginView';
import SignupView from './SignupView';
import ProfileView from './ProfileView';
import UserFavoritesList from '../components/userFavoritesList';
import NavigationBar from '../components/NavigationBar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';

function MainView() {
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const storedToken = localStorage.getItem('token');
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);
	const [movies, setMovies] = useState([]);

	// Get all movies from server
	async function fetchMovies() {
		try {
			const fetchedData = await fetch('https://aidens-myflix-api.herokuapp.com/movies', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
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
		if (!token) return;

		fetchMovies();
	}, [token]);

	// Use to update user data from server after a change
	async function getUpdatedUser() {
		await axios
			.get(`https://aidens-myflix-api.herokuapp.com/users/${user.Username}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				setUser(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	// Display selected movie details and similar movie cards
	function displayMovieView() {
		return (
			<>
				<Container maxWidth={'100%'}>
					<MovieView user={user} setUser={setUser} token={token} movies={movies} />
					<SimilarMovies user={user} movies={movies} />
				</Container>
			</>
		);
	}

	function displayMovieCardList() {
		getUpdatedUser();
		return (
			<Grid sx={{ mt: 1, justifyContent: 'center' }} width={'100%'} container>
				{movies.map((movie, index) => (
					<Grid sx={{ m: 2 }} item xs={6} md={4} xl={2} key={index}>
						<MovieCard user={user} movie={movie} />
					</Grid>
				))}
			</Grid>
		);
	}

	function displayProfileView() {
		return (
			<>
				<Container maxWidth={'100%'}>
					<ProfileView
						user={user}
						token={token}
						movies={movies}
						onLoggedOut={() => onLoggedOut()}
					/>
					<UserFavoritesList user={user} token={token} movies={movies} />
				</Container>
			</>
		);
	}

	// Logout, reset state and clear browser storage
	function onLoggedOut() {
		setUser(null);
		setToken(null);
		localStorage.clear();
	}

	return (
		<BrowserRouter>
			<NavigationBar user={user} onLoggedOut={() => onLoggedOut()} />
			<Routes>
				<Route
					path='/login'
					element={
						<>
							{user ? (
								<Navigate to='/' />
							) : (
								<LoginVeiw
									onLoggedIn={(user, token) => {
										setUser(user);
										setToken(token);
									}}
								/>
							)}
						</>
					}
				/>
				<Route path='/signup' element={<>{user ? <Navigate to='/' /> : <SignupView />}</>} />
				<Route
					path='/'
					element={
						<>
							{!user ? (
								<Navigate to='/login' replace />
							) : !movies.length ? (
								<Box sx={{ display: 'flex', justifyContent: 'center', mt: 50 }}>
									<CircularProgress size={100} />
								</Box>
							) : (
								displayMovieCardList()
							)}
						</>
					}
				/>
				<Route
					path='/movies/:movieID'
					element={<>{!user ? <Navigate to='/login' replace /> : displayMovieView()}</>}
				/>
				<Route
					path='/profile'
					element={<>{!user ? <Navigate to='/login' replace /> : displayProfileView()}</>}
				/>
				<Route
					path='*'
					element={<>{!user ? <Navigate to='/login' reaplce /> : <Navigate to='/' />}</>}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default MainView;
