import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ moviesData, onSave, isSaved, onRemove }) {
  return (
    <ul className="movies-list">
      {
        moviesData.map(({ _id, ...movie }) => <MoviesCard onRemove={() => { onRemove(movie) }} isSaved={isSaved} onSave={() => { onSave(movie) }} key={movie.id || _id} movieData={movie} />)
      }
    </ul>
  )
}

export default MoviesCardList;