// Calculates the time difference between a given dateTime and the current date and time. 
// Formats this difference into a string indicating how long ago the given date and time occurred.
// e.g. a comment was made 2 hours ago

export default function timeFromNow(dateTime) {

    const currentDate = new Date();
    const postDate = new Date(dateTime);

    const timeDifference = currentDate - postDate;
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);

    if (daysDifference > 30) {
        // If over 30 days, return the actual date
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return postDate.toLocaleDateString(undefined, options);
    } else if (hoursDifference >= 24) {
        // If over 24 hours, return days
        return `${daysDifference} day${daysDifference !== 1 ? 's' : ''} ago`;
    } else if (hoursDifference >= 1) {
        // If over 1 hour, return hours
        return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
    } else if (minutesDifference >= 1) {
        // If over 1 minute, return minutes
        return `${minutesDifference} minute${minutesDifference !== 1 ? 's' : ''} ago`;
    } else {
        // If under 1 minute, return seconds
        return `${secondsDifference} second${secondsDifference !== 1 ? 's' : ''} ago`;
    }
}
