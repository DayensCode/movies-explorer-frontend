import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
//import savedMoviesData from '../../constants/saved';

function SavedMovies() {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList /*moviesData={savedMoviesData}*/ />
    </main>
  )
};

export default SavedMovies;
