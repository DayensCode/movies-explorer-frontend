import "./Movies.css";
import { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { moviesApi } from "../../utils/Movies.Api";

function Movies() {
  const [movies, setMovies] = useState(() => {
    const arr = JSON.parse(localStorage.getItem("movies")) || [];
    return arr;
  });

  function getMovies() {
    return moviesApi
      .getAllMovies()
      .then((res) => {
        localStorage.setItem("movies", JSON.stringify(res));
        setMovies(res);
      })
      .catch(() => console.log("Ошибка в getMovies"));
  }

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList moviesData={movies} />
      <button className="movies__button" type="button">
        Ещё
      </button>
    </main>
  );
}

export default Movies;
