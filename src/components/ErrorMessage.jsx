import Alert from '@mui/material/Alert';

export default function ErrorMessage({ message }) {
	return (
		<Alert severity='error' variant='outlined' sx={{ mt: 2 }}>
			{message}
		</Alert>
	);
}
