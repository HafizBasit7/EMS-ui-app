export const formatDate = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);

    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;

    const days = Math.floor(diffInSeconds / secondsInDay);
    const hours = Math.floor((diffInSeconds % secondsInDay) / secondsInHour);
    const minutes = Math.floor((diffInSeconds % secondsInHour) / secondsInMinute);

    let timeAgo = '';

    if (days > 0) {
        timeAgo += `${days} day${days !== 1 ? 's' : ''}`;
    }
    if (hours > 0) {
        timeAgo += (timeAgo ? ' ' : '') + `${hours} hour${hours !== 1 ? 's' : ''}`;
    }
    if (minutes > 0) {
        timeAgo += (timeAgo ? ' ' : '') + `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }

    // If there's no time difference, we return "just now" or similar
    if (!timeAgo) {
        timeAgo = 'just now';
    } else {
        timeAgo += ' ago';
    }

    return timeAgo;
};