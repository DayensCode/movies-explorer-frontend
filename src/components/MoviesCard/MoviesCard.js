import { useState } from 'react';
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import MovieCardButton from "./MovieCardButton/MovieCardButton";
import { convertingDuration } from "../../utils/utils";

function MoviesCard({ movieData }) {
  const { pathname } = useLocation();
  const [isSave, setIsSave] = useState(false);
  function saveMovieHandler() {
    setIsSave(true);
  }
  function deleteMovieHandler() {
    setIsSave(false);
  }
  return (
    <li className="movie-card">
      <img
        className="movie-card__image"
        alt={movieData.nameRu}
        src={movieData.image}
      />
      <MovieCardButton
        type={ isSave ? "movie-card-button_type_save" : null }
        onClickHandler={
          pathname === "/movies" ? saveMovieHandler : deleteMovieHandler
        }
      >
        {pathname === "/movies" && !isSave ? "Сохранить" : null}
        {pathname === "/movies" && isSave ? "✔" : null}
        {pathname === "/movies" ? null : "🞪"}
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
