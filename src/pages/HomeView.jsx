import { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	BrowserRouter,
} from 'react-router-dom';
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
import SearchBar from '../components/SearchBar';
import { MyFlixUrl } from '../utils/url';
import GalleryView from './GalleryView';

function HomeView() {
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const storedToken = localStorage.getItem('token');
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);
	const [movies, setMovies] = useState([]);
	const [allMovies, setAllMovies] = useState([]);
	const [gallery, setGallery] = useState([]);

	// Get all movies from server and set them to local state
	async function fetchMovies() {
		try {
			const fetchedData = await fetch(`${MyFlixUrl}/api/movies`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const jsonData = await fetchedData.json();
			const movies = jsonData.map((movie) => {
				return {
					_id: movie._id,
					Title: movie.Title,
					ImagePath: movie.ImagePath,
					Description: movie.Description,
					Actors: movie.Actors,
					Genre: {
						Name: movie.Genre.Name,
						Description: movie.Genre.Description,
					},
					Director: {
						Name: movie.Director.Name,
						Bio: movie.Director.Bio,
					},
				};
			});

			setMovies(movies);
			setAllMovies(movies);
		} catch (error) {
			console.log(error);
		}
	}

	// Use to update user data from server after a database change
	async function getUser() {
		await axios
			.get(`${MyFlixUrl}/api/users/${user.Username}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				setUser(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async function fetchS3Images() {
		await axios
			.get(`${MyFlixUrl}/images`)
			.then((data) => {
				const newGallery = data.data.Contents.map((image) => {
					return image.Key;
				});
				setGallery(newGallery);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		if (!token) return;

		fetchMovies();
		getUser();
	}, [token]);

	useEffect(() => {
		fetchS3Images();
	}, []);

	// Add movie to users favorite list
	async function handleAddToFavorites(movie) {
		return await axios({
			method: 'post',
			url: `${MyFlixUrl}/api/users/${user.Username}/movies/${movie._id}`,
			headers: { Authorization: 'Bearer ' + token },
		})
			.then((response) => {
				return getUser();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	// Delete movie from users favorites
	async function handleRemoveFromFavorites(movie) {
		return await axios
			.delete(`${MyFlixUrl}/api/users/${user.Username}/movies/${movie._id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				return getUser();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function displayMovieView() {
		return (
			<>
				<Container maxWidth={'100%'}>
					<MovieView
						user={user}
						setUser={setUser}
						token={token}
						movies={movies}
						handleAddToFavorites={handleAddToFavorites}
					/>
					<SimilarMovies
						user={user}
						movies={movies}
						handleRemoveFromFavorites={handleRemoveFromFavorites}
						handleAddToFavorites={handleAddToFavorites}
					/>
				</Container>
			</>
		);
	}

	function displayHomeView() {
		return (
			<Grid sx={{ mt: 1, justifyContent: 'center' }} container>
				<Grid sx={{ display: 'flex', justifyContent: 'center' }} xs={12} item>
					<SearchBar
						movies={movies}
						setMovies={setMovies}
						allMovies={allMovies}
					/>
				</Grid>
				{movies.map((movie, index) => (
					<Grid
						sx={{ m: { xs: 1 } }}
						xs={12}
						md={4}
						lg={3}
						item
						key={movie._id}>
						<MovieCard
							user={user}
							movie={movie}
							handleRemoveFromFavorites={handleRemoveFromFavorites}
							handleAddToFavorites={handleAddToFavorites}
						/>
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
						onLoggedOut={() => onLoggedOut()}
					/>
					<UserFavoritesList
						user={user}
						handleRemoveFromFavorites={handleRemoveFromFavorites}
						handleAddToFavorites={handleAddToFavorites}
					/>
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
				<Route
					path='/signup'
					element={<>{user ? <Navigate to='/' /> : <SignupView />}</>}
				/>
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
								displayHomeView()
							)}
						</>
					}
				/>
				<Route
					path='/movies/:movieID'
					element={
						<>{!user ? <Navigate to='/login' replace /> : displayMovieView()}</>
					}
				/>
				<Route
					path='/profile'
					element={
						<>
							{!user ? <Navigate to='/login' replace /> : displayProfileView()}
						</>
					}
				/>
				<Route
					path='/Gallery'
					element={
						<>
							{!user ? (
								<Navigate to='/login' replace />
							) : (
								<GalleryView
									gallery={gallery}
									addImage={(imageName) => {
										setGallery((prevGallery) => [...prevGallery, imageName]);
									}}
								/>
							)}
						</>
					}
				/>
				<Route
					path='*'
					element={
						<>
							{!user ? <Navigate to='/login' reaplce /> : <Navigate to='/' />}
						</>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default HomeView;
