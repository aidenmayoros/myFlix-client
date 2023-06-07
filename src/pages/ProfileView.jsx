import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import AlertDialog from '../components/AlertDialog';

export default function ProfileView({ user, token, movies, onLoggedOut }) {
	const [username, setUsername] = useState(user.Username);
	const [currentUsername, setCurrentUsername] = useState(user.Username);
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState(user.Email);
	const [birthdate, setBirthdate] = useState(formatedBirthdate());
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isDialogOpen, setIsDialogOpen] = React.useState(false);
	const navigate = useNavigate();

	function padTo2Digits(num) {
		return num.toString().padStart(2, '0');
	}

	// Format the birthdate data to MM/DD/YYYY format for date input
	function formatedBirthdate() {
		const date = new Date(user.Birthday);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();

		return [padTo2Digits(month), padTo2Digits(day), year].join('/');
	}

	async function fetchUpdateAccount() {
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
				alert('Update Success');
				onLoggedOut();
				navigate('/login');
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

	async function fetchDeleteUserAccount() {
		axios
			.delete(`https://aidens-myflix-api.herokuapp.com/users/${currentUsername}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				alert('Account deleted');
				onLoggedOut();
			})
			.catch((error) => {
				console.log(error);
				setShowErrorMessage(true);
				setErrorMessage('Delete account failed');
			});
	}

	// Handle the opening and closing of the dialog modal
	const handleClickOpen = () => {
		setIsDialogOpen(true);
	};

	const handleClose = () => {
		setIsDialogOpen(false);
	};

	// Handle the cancel of dialog modal
	const handleCancel = () => {
		setIsDialogOpen(false);
	};

	// Handle the deletion of users account
	const handleConfirm = () => {
		fetchDeleteUserAccount();
		setIsDialogOpen(false);
	};

	return (
		<Container sx={{ p: 5 }} maxWidth='xs'>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
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
						<Grid item xs={12}>
							<Link
								sx={{ float: 'right', color: 'red' }}
								href='#'
								underline='hover'
								onClick={handleClickOpen}>
								Delete Account
							</Link>
							<AlertDialog
								title='Are you sure you want to delete your account?'
								body=''
								open={isDialogOpen}
								handleClose={handleClose}
								handleCancel={handleCancel}
								handleConfirm={handleConfirm}></AlertDialog>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
