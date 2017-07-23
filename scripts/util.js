
export const timeAgo = (date, now) => {
  now |= Math.round(new Date().getTime()/1000.0);;
  const seconds = now - date;

  const years = Math.floor(seconds / 31556926);
  if (years) return years + " years ago";

  const months = Math.floor(seconds / 2629743);
  if (months) return months + " months ago";

  const days = Math.floor(seconds / 86400);
  if (days) return days + " days ago";

  const hours = Math.floor(seconds / 3600);
  if (hours) return hours + " hours ago";

  const minutes = Math.floor(seconds / 60);
  if (minutes) return minutes + " minutes ago";

  return Math.floor(seconds) + " seconds ago";
}
