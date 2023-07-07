import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import savedMoviesData from '../../constants/saved';

function SavedMovies() {
  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList moviesData={savedMoviesData}/>
    </section>
  )
};

export default SavedMovies;
