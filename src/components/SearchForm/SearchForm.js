import { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
	const [searchValue, setSearchValue] = useState('');
	const [isShortsChecked, setIsShortsChecked] = useState(false);

	function handleChange({target}) {
		setSearchValue(target.value);
	}

	const handleShortsCheck = () => {
		setIsShortsChecked(!isShortsChecked);
	}

	return (
		<div className="search">
			<form className="search__form">
				<input className="search__input" placeholder="Фильм" value={searchValue} onChange={handleChange} required />
				<button className="search__button" type="submit">Найти</button>
			</form>
			<FilterCheckbox isChecked={isShortsChecked} checkHandler={handleShortsCheck} />
		</div>
	)
}

export default SearchForm;