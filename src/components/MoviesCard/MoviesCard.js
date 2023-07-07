import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import MovieCardButton from "./MovieCardButton/MovieCardButton";
import { convertingDuration } from "../../utils/utils";

function MoviesCard({ movieData }) {
  const { pathname } = useLocation();
  function saveMovieHandler() {
    console.log("Фильм сохранен");
  }
  function deleteMovieHandler() {
    console.log("Фильм удален");
  }
  return (
    <li className="movie-card">
      <img
        className="movie-card__image"
        alt={movieData.nameRu}
        src={movieData.image}
      />
      <MovieCardButton
        type={""}
        onClickHandler={
          pathname === "/movies" ? saveMovieHandler : deleteMovieHandler
        }
      >
        {pathname === "/movies" ? "Сохранить" : "🞪"}
      </MovieCardButton>
      <div className="movie-card__description">
        <p className="movie-card__name">{movieData.nameRU}</p>
        <span className="movie-card__duration">
          {convertingDuration(movieData.duration)}
        </span>
      </div>
    </li>
  );
}

export default MoviesCard;
