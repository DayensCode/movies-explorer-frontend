import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState } from "react";

function SavedMovies() {
  const [savedMoviesData, setSavedMoviesData] = useState(() => {
    return JSON.parse(localStorage.getItem("savedMovie"))
  })



  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList moviesData={savedMoviesData} />
    </main>
  )
};

export default SavedMovies;
