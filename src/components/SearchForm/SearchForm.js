import { useState, useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ onSearch, emptyQuery }) {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchValue, setSearchValue] = useState(searchQuery);
	const [isShortsChecked, setIsShortsChecked] = useState(false);

	function handleChange({target}) {
		setSearchValue(target.value);
	}

	const handleShortsCheck = () => {
		onSearch(searchValue, !isShortsChecked);
		setIsShortsChecked(!isShortsChecked);
	}

	function handleSearch(e) {
		e.preventDefault();
		onSearch(searchValue, isShortsChecked);
	}

	return (
		<div className="search">
			<form className="search__form">
				<input className="search__input" placeholder="Фильм" value={searchValue} onChange={handleChange} required />
				<button className="search__button" type="submit" onClick={handleSearch}>Найти</button>
			</form>
			{emptyQuery ? <span className="search__validation">Нужно ввести ключевое слово</span> : null}
			<FilterCheckbox isChecked={isShortsChecked} checkHandler={handleShortsCheck} />
		</div>
	)
}

export default SearchForm;