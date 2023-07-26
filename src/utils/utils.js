export function convertingDuration(duration) {
	const hours = Math.trunc(duration / 60);
	const minutes = duration % 60;
	const result = [];
	if(hours) result.push(`${hours}ч`);
	if(minutes) result.push(`${minutes}м`);
	return result.join(' ');
}

// все про фильтрацию
function querryFilter(movie, query) {
	const correctQuery = query.toLowerCase(); 
	const check = movie.nameRU.toLowerCase().includes(correctQuery);
	console.log("Результат проверки:", check);
	return check;
}
export function filterMovies(movie, query) {
	return querryFilter(movie, query);
}