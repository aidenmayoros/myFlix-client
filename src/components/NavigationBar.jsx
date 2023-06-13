import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router';
import { Typography } from '@mui/material';

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
						<Typography sx={{ fontSize: { xs: '1.2em', lg: '1.5em' }, padding: { xs: 2 } }}>
							MyFlix
						</Typography>
					</Button>
					<IconButton
						sx={{ transform: { xs: 'scale(1)', md: 'scale(1.5)' } }}
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
						<MenuItem
							sx={{ fontSize: { sm: '2em', md: '1.5em', lg: '1em' } }}
							onClick={() => navigate('/profile')}>
							Profile
						</MenuItem>
						<MenuItem
							sx={{ fontSize: { sm: '2em', md: '1.5em', lg: '1em' } }}
							onClick={onLoggedOut}>
							Logout
						</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
