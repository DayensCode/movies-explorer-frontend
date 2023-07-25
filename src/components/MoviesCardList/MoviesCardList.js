import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ moviesData }) {
	return (
		<ul className="movies-list">
			{
				moviesData.map(({_id, ...movie}) => <MoviesCard key={movie.id} movieData={movie} />)
			}
		</ul>
	)
}

export default MoviesCardList;