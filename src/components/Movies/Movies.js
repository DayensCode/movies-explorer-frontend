import "./Movies.css";
import { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { moviesApi } from "../../utils/Movies.Api";
import { filterMovies } from "../../utils/utils";
import Preloader from "../Preloader/Preloader";

function Movies({ setModal, closeModal }) {
  const [isLoadind, setIsLoading] = useState(false);
  const [movies, setMovies] = useState(() => {
    const arr = JSON.parse(localStorage.getItem("movies")) || [];
    return arr;
  });

  function getMovies() {
    setIsLoading(true);
    return moviesApi.getAllMovies()
      .then((res) => {
        localStorage.setItem("movies", JSON.stringify(res));
      })
      .catch((err) => setModal({ text: err, statusOk: false, isOpen: true }))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    setMovies([]);
    getMovies();
  }, [])

    //все про поиск
    const [isEmptyQuery, setIsEmptyQuery] = useState(false);
    const [isNothingFound, setIsNothingFound] = useState(false);

    function searchMovies(q, s) {
      if (q === "") {
        setIsEmptyQuery(true);
        return setMovies([]);
      } //если пользователь ещё ничего не искал фильмы не отображаются
      
      console.log("Поисковой запрос:", q, s);
      setIsEmptyQuery(false);
      let allLocalMovies = JSON.parse(localStorage.getItem("movies"));
      const currentSearchedResult = allLocalMovies.filter(movie => filterMovies(movie, q, s));
      console.log("Найденные совпадения:", currentSearchedResult);
      if ( currentSearchedResult.length === 0) {setIsNothingFound(true)}
      setMovies(currentSearchedResult);
    }

  return (
    <main className="movies" onClick={closeModal}>
      <SearchForm onSearch={searchMovies} emptyQuery={isEmptyQuery} />
      { isLoadind
        ? <Preloader />
        : <MoviesCardList moviesData={movies} />
      }
      {isNothingFound ? <span className="movies__nothing">Ничего не найдено</span> : null}
      <button className="movies__button" type="button">
        Ещё
      </button>
    </main>
  );
}

export default Movies;
