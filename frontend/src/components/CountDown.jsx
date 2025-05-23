import { useEffect, useState } from "react";
import { formatTime, startCountdown } from "../utils/formatDate";

export default function Countdown({ startDate, startTime, onEnd }) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const interval = startCountdown(startDate, startTime, setTimeLeft);
    return () => clearInterval(interval);
  }, [startDate, startTime]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft <= 0) {
      onEnd?.();
    }
  }, [timeLeft, onEnd]);

  if (timeLeft === null) return null;

  return (
    <p className="text-lg mt-2 text-center">
        {timeLeft > 0 && `COMIENZA EN ${formatTime(timeLeft)}`}
    </p>
  );
}
