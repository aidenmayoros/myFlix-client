import { useState } from 'react';
import MovieCard from './MovieCard';
import MovieView from './MovieView';

function MainView() {
	const [movies, setMovies] = useState([
		{
			_id: '643dac4e277732ccdae7e80f',
			title: 'It',
			description:
				'In the summer of 1989, a group of bullied kids band together to destroy a shape-shifting monster, which disguises itself as a clown and preys on the children of Derry, their small Maine town.',
			genre: {
				name: 'Horror',
				description:
					'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.',
			},
			director: {
				name: 'Andy Muschietti',
				bio: 'Andy Muschietti was born on August 26, 1973 in Buenos Aires, Federal District, Argentina. He is a producer and director, known for Mama (2013), It (2017) and It Chapter Two (2019).',
				birth: '1973-08-26',
				death: 'N/A',
			},
			imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5a/It_%282017%29_poster.jpg',
		},
		{
			_id: '643dac4e277732ccdae7e810',
			title: 'John Wick',
			description: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took his car.',
			genre: {
				name: 'Action',
				description:
					'Movies in the action genre are fast-paced and include a lot of action like fight scenes, chase scenes, and slow-motion shots. They can feature superheroes, martial arts, or exciting stunts. These high-octane films are more about the execution of the plot rather than the plot itself.',
			},
			director: {
				name: 'Chad Stahelski',
				bio: "He came from a kick-boxing background; he entered the film field as a stunt performer at the age of 24. Before that, he worked as an instructor at the Inosanto Martial Arts Academy in California, teaching Jeet Kune Do/Jun Fan. After doing numerous roles in low budget martial art movies like Mission of Justice (1992) and Bloodsport III (1996) his first start as a stunt double came from the movie The Crow (1994) for doubling late Brandon Lee whom he trained with at the Inosanto Academy. After Brandon Lee''s lethal accident Chad was picked for his stunt/photo double because he knew Lee, how he moved, and looked more like him than anyone else.",
				birth: '1968-09-20',
				death: 'N/A',
			},
			imagePath: 'https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg',
		},
		{
			_id: '643da969277732ccdae7e80c',
			title: 'The Dark Knight',
			description:
				'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice and save his city.',
			genre: {
				name: 'Action',
				description:
					'Movies in the action genre are fast-paced and include a lot of action like fight scenes, chase scenes, and slow-motion shots. They can feature superheroes, martial arts, or exciting stunts. These high-octane films are more about the execution of the plot rather than the plot itself.',
			},
			director: {
				name: 'Judd Apatow',
				bio: 'Judd Apatow is an American producer, writer, director, actor and stand-up comedian.',
				birth: '1967-01-01',
				death: 'N/A',
			},
			imagePath: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
		},
	]);

	const [selectedMovie, setSelectedMovie] = useState(null);

	return (
		<div>
			{selectedMovie ? (
				<MovieView
					movie={selectedMovie}
					onBackClick={() => {
						setSelectedMovie(null);
					}}
				/>
			) : movies.length ? (
				movies.map((movie) => (
					<MovieCard
						key={movie._id}
						movie={movie}
						onClick={(newSelectedMovie) => {
							setSelectedMovie(newSelectedMovie);
						}}
					/>
				))
			) : (
				<div>The list is empty!</div>
			)}
		</div>
	);
}

export default MainView;
