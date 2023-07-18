export function convertingDuration(duration) {
	const hours = Math.trunc(duration / 60);
	const minutes = duration % 60;
	const result = [];
	if(hours) result.push(`${hours}ч`);
	if(minutes) result.push(`${minutes}м`);
	return result.join(' ');
}