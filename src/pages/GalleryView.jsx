// import * as React from 'react';
// import { useState } from 'react';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import { Box, Container, Typography } from '@mui/material';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import Input from '@mui/material/Input';
// import CircularProgress from '@mui/material/CircularProgress';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import axios from 'axios';
// import { MyFlixUrl } from '../utils/url';

// const Alert = React.forwardRef(function Alert(props, ref) {
// 	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
// });

// export default function GalleryView({ gallery, addImage }) {
// 	const [file, setFile] = useState(null);
// 	const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
// 	const [alertMessage, setAlertMessage] = useState('');
// 	const [severity, setSeverity] = useState('');
// 	const [open, setOpen] = useState(false);

// 	const handleSnackOpen = () => {
// 		setOpen(true);
// 	};

// 	const handleSnackClose = (event, reason) => {
// 		if (reason === 'clickaway') {
// 			return;
// 		}

// 		setOpen(false);
// 	};

// 	const handleFileChange = (e) => {
// 		setFile(e.target.files[0]);
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		setShowLoadingSpinner(true);

// 		const formData = new FormData();
// 		formData.append('image', file);

// 		try {
// 			// Replace with your server endpoint
// 			const response = await fetch(`${MyFlixUrl}/upload`, {
// 				method: 'POST',
// 				body: formData,
// 			});

// 			if (response.ok) {
// 				const data = await response.json();
// 				console.log('File uploaded successfully:', data.message);
// 				setAlertMessage('File uploaded successfully');
// 				setSeverity('success');
// 				handleSnackOpen();
// 			} else {
// 				console.error('Error uploading file:', response.statusText);
// 				setAlertMessage('Unable to upload file');
// 				setSeverity('error');
// 				handleSnackOpen();
// 			}
// 		} catch (error) {
// 			console.error('Error uploading file:', error.message);
// 			setAlertMessage('Unable to upload file');
// 			setSeverity('error');
// 			handleSnackOpen();
// 		}
// 		setShowLoadingSpinner(false);
// 		// setTimeout(window.location.reload(), 10000);
// 	};

// 	return (
// 		<Container
// 			sx={{
// 				display: 'flex',
// 				justifyContent: 'center',
// 				alignItems: 'center',
// 				flexDirection: 'column',
// 			}}>
// 			<Typography variant='h4' sx={{ m: 1, pt: 1 }}>
// 				Images from S3 Bucket
// 			</Typography>
// 			{showLoadingSpinner ? (
// 				<Box sx={{ display: 'flex' }}>
// 					<CircularProgress size={100} />
// 				</Box>
// 			) : (
// 				<div></div>
// 			)}
// 			<form onSubmit={handleSubmit}>
// 				<Input
// 					type='file'
// 					onChange={handleFileChange}
// 					sx={{ p: 1, m: 1 }}></Input>
// 				<Button
// 					type='submit'
// 					variant='contained'
// 					startIcon={<CloudUploadIcon />}>
// 					Upload File
// 				</Button>
// 			</form>
// 			<Snackbar
// 				open={open}
// 				autoHideDuration={6000}
// 				onClose={handleSnackClose}
// 				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
// 				<Alert
// 					onClose={handleSnackClose}
// 					severity={severity}
// 					sx={{ width: '100%' }}>
// 					{alertMessage}
// 				</Alert>
// 			</Snackbar>
// 			<ImageList cols={3} gap={18}>
// 				{gallery.map((imageName) => (
// 					<ImageListItem sx={{ width: 200, height: 200 }}>
// 						<img
// 							src={`${MyFlixUrl}/view-image/${imageName}`}
// 							alt={imageName}
// 							loading='lazy'
// 						/>
// 					</ImageListItem>
// 				))}
// 			</ImageList>
// 		</Container>
// 	);
// }
