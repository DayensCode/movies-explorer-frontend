import './FilterCheckbox.css';

function FilterCheckbox({isChecked, checkHandler}) {
	return (
		<label className="checkbox">
			<input className="checkbox_type_default" type="checkbox" checked={isChecked} onChange={checkHandler}/>
			<span className="checkbox_type_custom"/>
			Короткометражки
		</label>
	)
}

export default FilterCheckbox;