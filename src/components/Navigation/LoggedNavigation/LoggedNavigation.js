import './LoggedNavigation.css';
import { NavLink } from 'react-router-dom';

function LoggedNavigation() {
	return (
		<>
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
		</>
	)
}

export default LoggedNavigation;