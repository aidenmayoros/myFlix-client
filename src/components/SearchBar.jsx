import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { Box } from '@mui/material';

export default function SearchBar({ movies, setMovies, allMovies }) {
	const handleSearch = (event) => {
		const query = event.target.value;

		const filteredMovies = movies.filter((movie) =>
			movie.Title.toLowerCase().includes(query.toLowerCase())
		);

		if (!filteredMovies.length || !query) {
			return setMovies(allMovies);
		} else {
			setMovies(filteredMovies);
		}
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
		}
	};

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 1 } }}>
			<TextField
				label='Search'
				variant='outlined'
				onChange={handleSearch}
				onKeyPress={handleKeyPress}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<SearchIcon />
						</InputAdornment>
					),
				}}
			/>
		</Box>
	);
}
