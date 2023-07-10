import './Navigation.css';
import { NavLink } from 'react-router-dom';
import LoginRegisterMenu from './LoginRegisterMenu/LoginRegisterMenu';

function Navigation({ isLogged }) {
  return(
    <nav className="navigation">
      <ul className="navigation__list">
        { isLogged
          ? <>
              <li className="navigation__item">
                <NavLink to="/movies" className="navigation__link">Фильмы</NavLink>
              </li>
              <li className="navigation__item">
                <NavLink to="/saved-movies" className="navigation__link navigation__link_type_saved-movies">Сохранённые фильмы</NavLink>
              </li>
            </>
          : null
        }
      </ul>
      {
        isLogged
        ? <div className="navigation__item-icon">
            <NavLink to="/profile" className="navigation__link navigation__link_type_profile">Аккаунт</NavLink>
          </div>
        : <LoginRegisterMenu />
      }
    </nav>
  )
}

export default Navigation;
