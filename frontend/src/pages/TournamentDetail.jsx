import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTournamentById } from "../api/tournaments";
import Layout from "../components/Layout";
import { formatTime, startCountdown } from "../utils/formatDate";

export default function TournamentDetails() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    let interval;
    getTournamentById(id)
      .then((data) => {
        setTournament(data);
        interval = startCountdown(data.start_date, data.start_time, setTimeLeft);
      })
      .catch((err) => console.error("Error:", err));

    return () => clearInterval(interval);
  }, [id]);

  if (!tournament) {
    return <div className="text-white p-4">Cargando torneo...</div>;
  }

  return (
    <Layout>
      <main className="flex flex-col min-h-screen w-full bg-black text-yellow-200 px-8 py-4">
        <h1 className="text-2xl font-bold text-center">{tournament.name}</h1>

        <p className="text-lg text-center mt-1">🏆 Premio: {tournament.prize} pts</p>

        <p className="text-lg mt-2 text-center">
          {timeLeft > 0 ? `COMIENZA EN ${formatTime(timeLeft)}` : "¡El torneo está en juego!"}
        </p>

        <div className="grid grid-cols-2 gap-6 flex-grow mb-4 mt-6">
          {/* Participantes */}
          <div>
            <div className="grid grid-cols-3 gap-2 font-bold border-b pb-2 border-yellow-200">
              <span>PARTICIPANTES</span>
              <span>PUNTOS</span>
            </div>
            {tournament.players.map((player, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 py-2">
                <span>
                  {player.username}{" "}
                  {player.id === tournament.creator.id && <span title="Creador">👑</span>}
                </span>
                <span>{player.points ?? "0"}</span>
              </div>
            ))}
            {Array.from({ length: Math.max(0, 5 - tournament.players.length) }).map((_, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 opacity-20">
                <span>-</span><span>-</span><span>-</span>
              </div>
            ))}
          </div>

          {/* Encuentros */}
          <div>
            <div className="grid grid-cols-3 font-bold border-b pb-2 border-yellow-200">
              <span>ENCUENTROS EN PROGRESO</span>
              <span></span>
              <span></span>
            </div>
            {tournament.players.length >= 2 ? (
              <div className="grid grid-cols-3 gap-2 py-2">
                <span>{tournament.players[0].username}</span>
                <span>VS</span>
                <span>{tournament.players[1].username}</span>
              </div>
            ) : (
              <p className="mt-2 text-sm text-yellow-400">No hay partidas en progreso</p>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
