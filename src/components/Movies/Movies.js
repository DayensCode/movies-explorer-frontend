import "./Movies.css";
import { useEffect, useState, useCallback } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { moviesApi } from "../../utils/Movies.Api";
import { filterMovies, getCorrectNumberMovies } from "../../utils/utils";
import Preloader from "../Preloader/Preloader";

function Movies({ setModal, closeModal, onModal }) {
  const [isLoadind, setIsLoading] = useState(false);
  const [correctNumber, setCorrectNumber] = useState(getCorrectNumberMovies());
  const [displayingMoreButton, setDisplayingMoreButton] = useState(true);
  //все про поиск
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [finalCorrectNumber, setFinalCorrectNumber] = useState(correctNumber.defaultMovies);
  const [searchedResult, setSearchedResult] = useState(() => {
    return JSON.parse(localStorage.getItem("currentSearchedResult")) || [];
  });
  const [movies, setMovies] = useState(() => {
    const arr = JSON.parse(localStorage.getItem("movies")) || getMovies();
    return arr;
  });

  function getMovies() {
    setIsLoading(true);
    return moviesApi.getAllMovies()
      .then((res) => {
        localStorage.setItem("movies", JSON.stringify(res));
        setMovies(res);
      })
      .catch((err) => setModal({ text: err, statusOk: false, isOpen: true }))
      .finally(() => setIsLoading(false))
  }

  function searchMovies(querry, shorts) {
    setFinalCorrectNumber(correctNumber.defaultMovies);
    localStorage.setItem("querry", querry);
    localStorage.setItem("shorts", JSON.stringify(shorts));
    if (querry === "") {
      onModal({ statusOk: false, text: "Введите ключевое слово.", isOpen: true })
      return
    } //если пользователь ещё ничего не искал фильмы не отображаются
    const currentSearchedResult = movies.filter(movie => filterMovies(movie, querry, shorts));
    if (currentSearchedResult.length === 0) {
      setIsNothingFound(true);
    } else {
      setIsNothingFound(false);
      console.log("Найденные после фильтрации фильмы:", currentSearchedResult);
      setSearchedResult(currentSearchedResult);
      localStorage.setItem("currentSearchedResult", JSON.stringify(currentSearchedResult))
    }
  }

  function handleMoreMovies() {
    setFinalCorrectNumber(prev => prev + correctNumber.extraMovies);
  }

  // событие ресайза
  const resize = useCallback(() => {
    setCorrectNumber(getCorrectNumberMovies());
  }, [correctNumber]);

  useEffect(() => {
    window.addEventListener("resize", resize);
    console.log("После ресайза: ", correctNumber);
    setFinalCorrectNumber(correctNumber.defaultMovies);
    return () => window.removeEventListener("resize", resize);
  }, [resize, correctNumber]);

  const movieToRender = searchedResult.slice(0, finalCorrectNumber);

  useEffect(() => {
    setDisplayingMoreButton(searchedResult.length > movieToRender.length);
  }, [searchedResult, movieToRender])

  console.log("finalCorrectNumber", finalCorrectNumber)

  return (
    <main className="movies" onClick={closeModal}>
      <SearchForm onSearch={searchMovies} />
      {isLoadind
        ? <Preloader />
        : <MoviesCardList moviesData={movieToRender} />
      }
      {isNothingFound ? <span className="movies__nothing">Ничего не найдено</span> : null}
      {displayingMoreButton
        ? <button className="movies__button" type="button" onClick={handleMoreMovies}>Ещё</button>
        : null
      }
    </main>
  );
}

export default Movies;
