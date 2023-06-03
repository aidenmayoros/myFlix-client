import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function ProfileView({ user, token, movies }) {
	const [username, setUsername] = useState(user.Username);
	const [currentUsername, setCurrentUsername] = useState(user.Username);
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState(user.Email);
	const [birthdate, setBirthdate] = useState(formatedBirthdate());
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	console.log(user, currentUsername);
	console.log(token);

	// Format the birthdate data to MM/DD/YYYY format for date input
	function padTo2Digits(num) {
		return num.toString().padStart(2, '0');
	}

	function formatedBirthdate() {
		const date = new Date(user.Birthday);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();

		return [padTo2Digits(month), padTo2Digits(day), year].join('/');
	}

	async function fetchUpdateAccount() {
		console.log('requesting');
		await axios
			.put(
				`https://aidens-myflix-api.herokuapp.com/users/${currentUsername}`,
				{
					Username: username,
					Password: password,
					Email: email,
					Birthday: birthdate,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			.then((response) => {
				alert('Update was Successful');
			})
			.catch((error) => {
				console.log(error);
				setShowErrorMessage(true);
				setErrorMessage('Account update failed');
			});
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		if (username === '' || password === '' || email === '') {
			setShowErrorMessage(true);
			setErrorMessage('Please fill in all required* fields');
			return;
		}

		fetchUpdateAccount();
	};

	return (
		<Container sx={{ p: 5 }} maxWidth='xs'>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					maxWidth: '350px',
				}}>
				<Typography variant='h5'>Update Account</Typography>
				{showErrorMessage ? <ErrorMessage message={errorMessage} /> : <span></span>}
				<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
						<Grid item xs={12}>
							<TextField
								sx={{ width: '100%' }}
								margin='normal'
								required
								id='username'
								label='Username'
								name='username'
								autoFocus
								autoComplete='username'
								defaultValue={currentUsername}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								sx={{ width: '100%' }}
								margin='normal'
								required
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								sx={{ width: '100%' }}
								margin='normal'
								required
								name='email'
								label='Email'
								type='email'
								id='email'
								autoComplete='current-email'
								defaultValue={user.Email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									sx={{ mt: 2, width: '100%' }}
									label='Birthdate'
									defaultValue={dayjs(birthdate)}
									onChange={(newValue) => setBirthdate(newValue.$d)}
								/>
							</LocalizationProvider>
						</Grid>
						<Grid item xs={12}>
							<Button sx={{ mt: 3, mb: 2 }} type='submit' variant='contained' fullWidth>
								Update
							</Button>
						</Grid>
						<Grid item xs={12}>
							<Button type='button' variant='contained' fullWidth onClick={() => navigate('/')}>
								Back
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
