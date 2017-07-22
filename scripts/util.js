
export const timeAgo = (date, now) => {
  now |= new Date();
  const seconds = Math.floor((now - date) / 1000);
  const years = Math.floor(seconds / 31536000);

  if (years) return years + " years ago";

  const months = Math.floor(seconds / 2592000);
  if (months) return months + " months ago";

  const days = Math.floor(seconds / 86400);
  if (days) return days + " days ago";

  const hours = Math.floor(seconds / 3600);
  if (hours) return hours + " hours ago";

  const minutes = Math.floor(seconds / 60);
  if (minutes) return minutes + " minutes ago";

  return Math.floor(seconds) + " seconds ago";
}
