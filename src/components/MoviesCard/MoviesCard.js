import './MoviesCard.css';
import { convertingDuration } from '../../utils/utils';

function MoviesCard({ movieData }) {
	return (
		<li className="movie-card">
			<img className="movie-card__image" alt={movieData.nameRu} src={movieData.image}/>
			<button className="movie-card__save" type="button">Сохранить</button>
			<div className="movie-card__description">
				<p className="movie-card__name">{movieData.nameRU}</p>
				<span className="movie-card__duration">{convertingDuration(movieData.duration)}</span>
			</div>
		</li>
	)
}

export default MoviesCard;