import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesData from '../../constants/list';

function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList moviesData={moviesData}/>
      <button className="movies__button" type="button">Ещё</button>
    </main>
  )
};

export default Movies;
