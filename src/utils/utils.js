export function convertingDuration(duration) {
	const hours = Math.trunc(duration / 60);
	const minutes = duration % 60;
	const result = [];
	if(hours) result.push(`${hours}ч`);
	if(minutes) result.push(`${minutes}м`);
	return result.join(' ');
}

// все про фильтрацию
function queryFilter(movie, query) {
	const correctQuery = query.toLowerCase(); 
	const check = movie.nameRU.toLowerCase().includes(correctQuery);
	console.log("Результат проверки:", check);
	return check;
}

function durationFilter(duration, shorts, correctDuration = 40) {
	if (shorts && (duration <= correctDuration)) {
		return true;
	} else {
		return (!shorts);
	}
}

export function filterMovies(movie, query, shorts) {
	return queryFilter(movie, query) && durationFilter(movie.duration, shorts);
}