import './MovieCardButton.css';

function MovieCardButton({children, type, onClickHandler}) {
	return (
		<button className={`movie-card-button ${type}`} onClick={onClickHandler}>
			{children}
		</button>
	)
}

export default MovieCardButton;