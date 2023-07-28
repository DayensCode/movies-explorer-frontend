import "./Movies.css";
import { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { moviesApi } from "../../utils/Movies.Api";
import { filterMovies } from "../../utils/utils";

function Movies() {
  const [movies, setMovies] = useState(() => {
    const arr = JSON.parse(localStorage.getItem("movies")) || [];
    return arr;
  });

  function getMovies() {
    return moviesApi.getAllMovies()
      .then((res) => {
        localStorage.setItem("movies", JSON.stringify(res));
      })
      .catch(() => console.log("Ошибка в getMovies"));
  }

  useEffect(() => {
    setMovies([]);
    getMovies();
  }, [])

    //все про поиск
    function searchMovies(q, s) {
      if (q === '') return setMovies([]); //если пользователь ещё ничего не искал фильмы не отображаются
      
      console.log("Поисковой запрос:", q, s);
      let allLocalMovies = JSON.parse(localStorage.getItem("movies"));
      const currentSearchedResult = allLocalMovies.filter(movie => filterMovies(movie, q, s));
      console.log("Найденные совпадения:", currentSearchedResult);
      setMovies(currentSearchedResult);
    }

  return (
    <main className="movies">
      <SearchForm onSearch={searchMovies} />
      <MoviesCardList moviesData={movies} />
      <button className="movies__button" type="button">
        Ещё
      </button>
    </main>
  );
}

export default Movies;
