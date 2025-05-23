import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {getTournamentById,joinTournament,leaveTournament, startTournament} 
from "../api/tournaments";
import Layout from "../components/Layout";
import Countdown from "../components/CountDown";
import Alert from "../components/Alert";
import { getCurrentUser } from "../services/authService";

export default function TournamentDetails() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [joinUser, setJoinUser] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [canStart, setCanStart] = useState(false);

  const [user, setUser] = useState(null);

   useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError(true);
      setErrorMessage("No hay token de acceso.");
      return;
    }
    getCurrentUser(token)
      .then((data) => setUser(data))
      .catch(() => {
        setError(true);
        setErrorMessage("No se pudo cargar el usuario actual");
      });
  }, []);

  useEffect(() => {
    getTournamentById(id)
      .then((data) => setTournament(data))
      .catch((err) => console.error("Error:", err));
  }, [joinUser]);

  if (!tournament || !user) return <div className="text-white p-4">Cargando...</div>;

  const isPlayer = tournament.players.some((p) => p.id === user.id);
  const isCreator = user.username === tournament.creator;

  const handleCountdownEnd = () => {
    setCanStart(true);
  };

  const handleStartTournament = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await startTournament(tournament.id, token);
      navigator("/tournaments");
    } catch (err) {
      setError(true);
      setErrorMessage(err.response?.data?.detail || "Error al comenzar el torneo.");
    }
  };

  const handleJoin = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await joinTournament(tournament.id, token);
      setJoinUser(true);
    } catch (err) {
      setJoinUser(false);
      setError(true);
      setErrorMessage(err.response?.data?.detail || "Error al unirse.");
    }
  };

  const handleLeave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await leaveTournament(tournament.id, token);
      setJoinUser(false);
    } catch (err) {
      setError(true);
      setErrorMessage(err.response?.data?.detail || "Error al salir.");
    }
  };

  return (
    <Layout>
      {error && <Alert message={errorMessage} />}
      <main className="flex flex-col min-h-screen w-full bg-black text-yellow-200 px-8 py-4">
        <h1 className="text-2xl font-bold text-center">{tournament.name}</h1>
        <p className="text-lg text-center mt-1">🏆 Premio: {tournament.prize} pts</p>
        <Countdown
          startDate={tournament.start_date}
          startTime={tournament.start_time}
          onEnd={handleCountdownEnd}
        />
        <div className="flex flex-col items-center mt-4">
         {isCreator && tournament.status === "PENDING" &&  (
                        <button
                          className={`ml-2 font-bold py-1 px-3 rounded text-sm ${
                            canStart
                              ? "bg-green-500 text-white"
                              : "bg-gray-400 text-gray-200 cursor-not-allowed"
                          }`}
                          disabled={!canStart}
                          onClick={handleStartTournament}
                          title={canStart ? "Comenzar torneo" : "Esperando countdown"}
                        >
                          Comenzar torneo
                        </button>
          )}
          <button
            className={`font-bold py-2 px-4 rounded mt-4 ${
              isPlayer ? "bg-red-200 text-black" : "bg-yellow-200 text-black"
            }`}
            onClick={isPlayer ? handleLeave : handleJoin}
          >
            {isPlayer ? "Salir del torneo" : "Unirme al torneo"}
          </button>
          <p className="mt-4">{tournament.players.length} / {tournament.players_amount}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 flex-grow mb-4 mt-6">
          <div>
            <div className="grid grid-cols-3 gap-2 font-bold border-b pb-2 border-yellow-200">
              <span>PARTICIPANTES</span>
              <span>PUNTOS</span>
            </div>
            {tournament.players.map((playerItem, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 py-2">
                <span>
                  {playerItem.username}{" "}
                  {playerItem.username === tournament.creator && (
                    <>
                      <span title="Creador">👑</span>{" "}
                    </>
                  )}
                </span>
                <span>{playerItem.points ?? "0"}</span>
              </div>
            ))}
            {Array.from({ length: Math.max(0, 5 - tournament.players.length) }).map((_, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 opacity-20">
                <span>-</span><span>-</span><span>-</span>
              </div>
            ))}
          </div>

          <div>
          <div className="grid grid-cols-3 font-bold border-b pb-2 border-yellow-200">
            <span>ENCUENTROS EN PROGRESO</span><span></span><span></span>
          </div>
            {console.log("Tournament:", tournament)}
            {tournament.games && tournament.games.length > 0 ? (
              tournament.games.map((game, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 py-2">
                  <span>{game}</span>
                </div>
              ))
            ) : (
              <p className="mt-2 text-sm text-yellow-400">No hay partidas en progreso</p>
            )}

        </div>
        </div>
      </main>
    </Layout>
  );
}
