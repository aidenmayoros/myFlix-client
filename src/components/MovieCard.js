function MovieCard({ movie, onClick }) {
	return (
		<div>
			<p
				onClick={() => {
					onClick(movie);
				}}>
				{movie.title}
			</p>
		</div>
	);
}

export default MovieCard;
