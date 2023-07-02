import './Navigation.css';
import { NavLink } from 'react-router-dom';

function Navigation({ isLoggedIn }) {
  return(
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink to="/movies" className="navigation__link">Фильмы</NavLink>
        </li>
        <li className="navigation__item">
          <NavLink to="/saved-movies" className="navigation__link navigation__link_type_saved-movies">Сохранённые фильмы</NavLink>
        </li>
      </ul>
      <div className="navigation__item-icon">
        <NavLink to="/profile" className="navigation__link navigation__link_type_profile">Аккаунт</NavLink>
      </div>
    </nav>
  )
}

export default Navigation;
