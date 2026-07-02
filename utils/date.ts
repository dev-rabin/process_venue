export const formatDate = (value: string | number): string => {
    const date = new Date(value);
    return date.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

export const formatRelativeTime = (value: string | number): string => {
    const date = new Date(value);
    const diffInSeconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diffInSeconds < 60) {
        return "Just now";
    }
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} min ago`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hr ago`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    }
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
};