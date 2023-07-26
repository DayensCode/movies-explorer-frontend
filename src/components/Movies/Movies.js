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
        setMovies(res);
      })
      .catch(() => console.log("Ошибка в getMovies"));
  }

    //все про поиск
    const [searchOptions, setSearchOptions] = useState({query: ""});
    const [searchedMovies, setSearchedMovies] = useState([]);


    function searchMovies(q) {
      if (q === '') return getMovies(); //если поисковой запрос пустой отрисовываются все фильмы
      
      console.log("Поисковой запрос:", q);
      const currentSearchedResult = movies.filter(movie => filterMovies(movie, q));
      console.log("Найденные совпадения:", currentSearchedResult);
      setMovies(currentSearchedResult);
    }

  return (
    <main className="movies">
      <SearchForm onSearch={searchMovies} searchOptions={searchOptions} />
      <MoviesCardList moviesData={movies} />
      <button className="movies__button" type="button">
        Ещё
      </button>
    </main>
  );
}

export default Movies;
