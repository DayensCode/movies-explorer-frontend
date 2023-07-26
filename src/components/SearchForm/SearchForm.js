import { useState, useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ onSearch, searchOptions }) {
	const [searchValue, setSearchValue] = useState(searchOptions.query);
	const [isShortsChecked, setIsShortsChecked] = useState(false);

	function handleChange({target}) {
		setSearchValue(target.value);
	}

	const handleShortsCheck = () => {
		setIsShortsChecked(!isShortsChecked);
	}

	function handleSearch(e) {
		e.preventDefault();
		onSearch(searchValue);
	}

	return (
		<div className="search">
			<form className="search__form">
				<input className="search__input" placeholder="Фильм" value={searchValue} onChange={handleChange} required />
				<button className="search__button" type="submit" onClick={handleSearch}>Найти</button>
			</form>
			<FilterCheckbox isChecked={isShortsChecked} checkHandler={handleShortsCheck} />
		</div>
	)
}

export default SearchForm;