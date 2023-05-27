import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';

function Copyright(props) {
	return (
		<Typography variant='body2' color='text.secondary' align='center' {...props}>
			{'Copyright © '}
			<Link color='inherit' href='https://www.aidenmayoros.com/'>
				aidenmayoros.com
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

function ErrorMessage({ message }) {
	return (
		<Alert severity='error' variant='outlined' sx={{ mt: 2 }}>
			{message}
		</Alert>
	);
}

async function fetchLogin(onLoggedIn, userData, setShowErrorMessage, setErrorMessage) {
	axios
		.post('https://aidens-myflix-api.herokuapp.com/login', { Username: userData.Username, Password: userData.Password })
		.then((response) => {
			onLoggedIn(response.data.user, response.data.token);
		})
		.catch((error) => {
			console.log(error);
			setShowErrorMessage(true);
			setErrorMessage('Username or Password was incorrect');
		});
}

const defaultTheme = createTheme();

export default function LoginView({ onLoggedIn }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		if (username === '' || password === '') {
			setShowErrorMessage(true);
			setErrorMessage('Please fill in all required* fields');
			return;
		}

		const userData = {
			Username: username,
			Password: password,
		};

		fetchLogin(onLoggedIn, userData, setShowErrorMessage, setErrorMessage);
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign in
					</Typography>
					{showErrorMessage ? <ErrorMessage message={errorMessage} /> : <span></span>}
					<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin='normal'
							required
							fullWidth
							id='username'
							label='Username'
							name='username'
							autoFocus
							autoComplete='username'
							onChange={(e) => setUsername(e.target.value)}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							onChange={(e) => setPassword(e.target.value)}
						/>
						<FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
						<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href='#' variant='body2'>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href='#' variant='body2'>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}
