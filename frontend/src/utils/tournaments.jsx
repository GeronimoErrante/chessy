export function getModeIcon(mode) {
  const normalizedMode = mode.toUpperCase();

  let icon = "";
  switch (normalizedMode) {
    case "STANDARD":
      icon = "♟";
      break;
    case "BLITZ":
      icon = "♚";
      break;
    case "BULLET":
      icon = "💣";
      break;
    default:
      icon = "❓";
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 bg-[#f0d989] flex items-center justify-center">
        <span className="text-black font-bold text-sm">{icon}</span>
      </div>
      {normalizedMode}
    </div>
  );
}

export function mapTournamentStatus(status) {
  switch (status) {
    case "IN_PROGRESS":
      return "En juego";
    case "FINISHED":
      return "Finalizado";
    case "PENDING":
      return "Pendiente";
    default:
      return status;
  }
}