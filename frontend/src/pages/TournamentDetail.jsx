import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTournamentById, joinTournament } from "../api/tournaments";
import Layout from "../components/Layout";
import Countdown from "../components/CountDown";

export default function TournamentDetails() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [joinUser, setJoinUser] = useState(false);

  useEffect(() => {
    let interval;
    getTournamentById(id)
      .then((data) => {
        setTournament(data);

      })
      .catch((err) => console.error("Error:", err));

    return () => clearInterval(interval);
  }, [joinUser]);

  if (!tournament) {
    return <div className="text-white p-4">Cargando torneo...</div>;
  }

  const handleJoin = async () => {
      try {
      const token = localStorage.getItem("accessToken");
      await joinTournament(tournament.id, token);
      setJoinUser(true);
    } catch (err) {
      setJoinUser(false);
      console.error("Error al ingresar al torneo:", err);
      alert("Error al ingresar el torneo.");
    }
  };

  return (
    <Layout>
      <main className="flex flex-col min-h-screen w-full bg-black text-yellow-200 px-8 py-4">
        <h1 className="text-2xl font-bold text-center">{tournament.name}</h1>

        <p className="text-lg text-center mt-1">🏆 Premio: {tournament.prize} pts</p>
        <Countdown startDate={tournament.start_date} startTime={tournament.start_time} />
        <div>
          <button className="bg-yellow-200 text-black font-bold py-2 px-4 rounded mt-4"
            onClick={() => handleJoin()}>
            Unirme al torneo
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6 flex-grow mb-4 mt-6">
          <div>
            <div className="grid grid-cols-3 gap-2 font-bold border-b pb-2 border-yellow-200">
              <span>PARTICIPANTES</span>
              <span>PUNTOS</span>
            </div>
            {tournament.players.map((player, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 py-2">
                <span>
                  {player.username}{" "}
                  {player.username === tournament.creator && <span title="Creador">👑</span>}
                  {console.log(player, tournament)}
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

          {/* Encuentros -> cambiar para que tome los games de cada torneo*/} 
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
