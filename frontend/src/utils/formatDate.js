export function formatTournamentDate(dateString, timeString) {
  const date = new Date(`${dateString}T${timeString}`);
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  return date.toLocaleString('es-ES', options).replace(',', ' -');
}

export function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const padded = (n) => n.toString().padStart(2, '0');

  if (hrs > 0) {
    return `${padded(hrs)}:${padded(mins)}:${padded(secs)}`;
  } else {
    return `${padded(mins)}:${padded(secs)}`;
  }
}

export function startCountdown(startDate, startTime, onTick) {
  const startDateTime = new Date(`${startDate}T${startTime}`);

  const interval = setInterval(() => {
    const now = new Date();
    const diffInSeconds = Math.max(0, Math.floor((startDateTime - now) / 1000));
    onTick(diffInSeconds);
    if (diffInSeconds <= 0) clearInterval(interval);
  }, 1000);

  return interval;
}
