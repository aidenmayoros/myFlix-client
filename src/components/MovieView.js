function MovieView({ movie, onBackClick }) {
	return (
		<div>
			<div>
				<img src={movie.imagePath} className='movie-img' />
			</div>
			<div>
				<span>Title: </span>
				<span>{movie.title}</span>
			</div>
			<div>
				<span>Description: </span>
				<span>{movie.description}</span>
			</div>
			<div>
				<span>Director: </span>
				<span>{movie.director.name}</span>
			</div>
			<button onClick={onBackClick}>Back</button>
		</div>
	);
}

export default MovieView;
