import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function ProfileView({ user, movies }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthdate, setBirthdate] = useState(user ? formatedBirthdate() : null);
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	console.log(birthdate);
	console.log(user);

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

	function handleSubmit() {
		return;
	}

	return (
		<Container sx={{ display: 'flex', justifyContent: 'center', p: 5 }} maxWidth={'100%'}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					maxWidth: '450px',
				}}>
				<Typography variant='h5'>Update Account</Typography>
				<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
						<Grid item xs={12}>
							<TextField
								sx={{ width: '100%', maxWidth: '300px' }}
								margin='normal'
								required
								id='username'
								label='Username'
								name='username'
								autoFocus
								autoComplete='username'
								value={user ? user.Username : 'Username'}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								sx={{ width: '100%', maxWidth: '300px' }}
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
								sx={{ width: '100%', maxWidth: '300px' }}
								margin='normal'
								required
								name='email'
								label='Email'
								type='email'
								id='email'
								autoComplete='current-email'
								value={user ? user.Email : 'Email'}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									sx={{ mt: 2, width: '100%', maxWidth: '300px' }}
									label='Birthdate'
									defaultValue={dayjs(birthdate)}
									onChange={(newValue) => setBirthdate(newValue.$d)}
								/>
							</LocalizationProvider>
						</Grid>
						<Grid item xs={12}>
							<Button sx={{ mt: 3 }} type='submit' variant='contained'>
								Update
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
