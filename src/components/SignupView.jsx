import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ErrorMessage from './ErrorMessage';
import Copyright from './Copyright';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

async function fetchSignUp(userData, setShowErrorMessage, setErrorMessage, backToSignIn) {
	axios
		.post('https://aidens-myflix-api.herokuapp.com/users', {
			Username: userData.Username,
			Password: userData.Password,
			Email: userData.Email,
			Birthday: userData.Birthday,
		})
		.then((response) => {
			alert('Signup Worked');
			backToSignIn();
		})
		.catch((error) => {
			console.log(error);
			setShowErrorMessage(true);
			setErrorMessage('Signup failed');
		});
}

const defaultTheme = createTheme();

export default function SignupView({ backToSignIn }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthdate, setBirthdate] = useState(null);
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		if (username === '' || password === '' || email === '') {
			setShowErrorMessage(true);
			setErrorMessage('Please fill in all required* fields');
			return;
		}

		const userData = {
			Username: username,
			Password: password,
			Email: email,
			Birthday: birthdate,
		};

		fetchSignUp(userData, setShowErrorMessage, setErrorMessage, backToSignIn);
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
						Sign up
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
						<TextField
							margin='normal'
							required
							fullWidth
							name='email'
							label='Email'
							type='email'
							id='email'
							autoComplete='email'
							onChange={(e) => setEmail(e.target.value)}
						/>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker sx={{ mt: 2 }} label='Birthdate' value={birthdate} onChange={(newValue) => setBirthdate(newValue.$d)} />
						</LocalizationProvider>
						<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
							Sign up
						</Button>
						<Button type='button' fullWidth variant='contained' onClick={backToSignIn}>
							Cancel
						</Button>
					</Box>
				</Box>
				<Copyright sx={{ mt: 4, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}
