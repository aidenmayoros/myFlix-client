import * as React from 'react';
import { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Input from '@mui/material/Input';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { MyFlixUrl } from '../utils/url';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function GalleryView({ gallery, addImage }) {
	const [file, setFile] = useState(null);
	const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [severity, setSeverity] = useState('');
	const [open, setOpen] = useState(false);

	const itemData = [];

	const handleSnackOpen = () => {
		setOpen(true);
	};

	const handleSnackClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setShowLoadingSpinner(true);

		const formData = new FormData();
		formData.append('image', file);

		try {
			// Replace with your server endpoint
			const response = await fetch(`http://localhost:8080/upload`, {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				const data = await response.json();
				console.log('File uploaded successfully:', data.message);
				setAlertMessage('File uploaded successfully');
				setSeverity('success');
				handleSnackOpen();
			} else {
				console.error('Error uploading file:', response.statusText);
				setAlertMessage('Unable to upload file');
				setSeverity('error');
				handleSnackOpen();
			}
		} catch (error) {
			console.error('Error uploading file:', error.message);
			setAlertMessage('Unable to upload file');
			setSeverity('error');
			handleSnackOpen();
		}
		setShowLoadingSpinner(false);
		// setTimeout(window.location.reload(), 10000);
	};

	return (
		<Container
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}>
			<Typography variant='h4' sx={{ m: 1, pt: 1 }}>
				Images from S3 Bucket
			</Typography>
			<ImageList sx={{ width: '50%' }} cols={3}>
				{itemData.map((item) => (
					<ImageListItem key={item.img}>
						<img
							srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
							src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
							alt={item.title}
							loading='lazy'
						/>
					</ImageListItem>
				))}
			</ImageList>
			{showLoadingSpinner ? (
				<Box sx={{ display: 'flex', justifyContent: 'center', mt: 50 }}>
					<CircularProgress size={100} />
				</Box>
			) : (
				<form onSubmit={handleSubmit}>
					<Input
						type='file'
						onChange={handleFileChange}
						sx={{ p: 1, m: 1 }}></Input>
					<Button
						type='submit'
						variant='contained'
						startIcon={<CloudUploadIcon />}>
						Upload File
					</Button>
				</form>
			)}
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleSnackClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<Alert
					onClose={handleSnackClose}
					severity={severity}
					sx={{ width: '100%' }}>
					{alertMessage}
				</Alert>
			</Snackbar>
		</Container>
	);
}

// 		img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
// 		title: 'Breakfast',
// 	},
// 	{
// 		img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
// 		title: 'Burger',
// 	},
// 	{
// 		img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
// 		title: 'Camera',
// 	},
// 	{
// 		img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
// 		title: 'Coffee',
// 	},
// 	{
// 		img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
// 		title: 'Hats',
// 	},
// 	{
// 		img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
// 		title: 'Honey',
// 	},
// 	{
// 		img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
// 		title: 'Basketball',
// 	},
// 	{
// 		img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
// 		title: 'Fern',
// 	},
// 	{
// 		img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
// 		title: 'Mushrooms',
// 	},
// 	{
// 		img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
// 		title: 'Tomato basil',
// 	},
// 	{
// 		img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
// 		title: 'Sea star',
// 	},
// 	{
// 		img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
// 		title: 'Bike',
// 	},
