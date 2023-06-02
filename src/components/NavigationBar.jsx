import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router';

export default function NavigationBar({ user, onLoggedOut }) {
	const { pathname } = useLocation();
	const shouldHideNavigation = ['/login', '/signup'].includes(pathname);
	if (shouldHideNavigation) {
		return null;
	}

	const [anchorEl, setAnchorEl] = React.useState(null);
	let navigate = useNavigate();

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar sx={{ justifyContent: 'space-between' }}>
					<Button sx={{ color: 'white' }} variant='text' onClick={() => navigate('/')}>
						MyFlix
					</Button>
					<IconButton
						size='large'
						aria-label='account of current user'
						aria-controls='menu-appbar'
						aria-haspopup='true'
						onClick={handleMenu}
						color='inherit'>
						<AccountCircle />
					</IconButton>
					<Menu
						id='menu-appbar'
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={Boolean(anchorEl)}
						onClose={handleClose}>
						<MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
						<MenuItem onClick={onLoggedOut}>Logout</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
