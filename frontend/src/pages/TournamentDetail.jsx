import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {getTournamentById,joinTournament,leaveTournament, startTournament} 
from "../api/tournaments";
import Layout from "../components/Layout";
import Countdown from "../components/CountDown";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { getCurrentUser } from "../services/authService";
import { useMessageHandler } from "../utils/messageHandler";

export default function TournamentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    error,
    errorMessage,
    success,
    successMessage,
    clearMessages,
    showError,
    showSuccess
  } = useMessageHandler();

  const [tournament, setTournament] = useState(null);
  const [joinUser, setJoinUser] = useState(false);
  const [canStart, setCanStart] = useState(false);
  const [showConfirmLeave, setShowConfirmLeave] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      showError("No hay token de acceso.");
      return;
    }
    setIsLoading(true);
    getCurrentUser(token)
      .then((data) => setUser(data))
      .catch(() => {
        showError("No se pudo cargar el usuario actual");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getTournamentById(id)
      .then((data) => setTournament(data))
      .catch((err) => console.error("Error:", err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [joinUser]);

  if (isLoading || !tournament || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const isPlayer = tournament.players.some((p) => p.id === user.id);
  const isCreator = user.username === tournament.creator;

  const handleCountdownEnd = () => {
    setCanStart(true);
  };

  const handleStartTournament = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await startTournament(tournament.id, token);
      showSuccess(response.detail);
      setTimeout(() => {
        navigate("/tournaments");
      }, 2000);
    } catch (err) {
      showError(err.response?.data?.detail || "Error al comenzar el torneo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoin = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await joinTournament(tournament.id, token);
      setJoinUser(true);
      showSuccess(response.detail);
    } catch (err) {
      setJoinUser(false);
      showError(err.response?.data?.detail || "Error al unirse.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeave = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await leaveTournament(tournament.id, token);
      setJoinUser(false);
      showSuccess(response.detail);
      const updatedTournament = await getTournamentById(id);
      setTournament(updatedTournament);
    } catch (err) {
      showError(err.response?.data?.detail || "Error al salir.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-4">
        {error && <Alert message={errorMessage} type="error" onClose={clearMessages} />}
        {success && <Alert message={successMessage} type="success" onClose={clearMessages} />}
      </div>
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
            onClick={isPlayer ? () => setShowConfirmLeave(true) : handleJoin}
          >
            {isPlayer ? "Salir del torneo" : "Unirme al torneo"}
          </button>
          <p className="mt-4">{tournament.players.length} / {tournament.players_amount}</p>
        </div>

        {showConfirmLeave && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-black p-6 rounded-lg max-w-md mx-4 border border-gold">
              <h3 className="text-lg font-bold mb-4 text-gold">Confirmar salida</h3>
              <p className="text-white mb-6">¿Estás seguro que quieres abandonar el torneo?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowConfirmLeave(false)}
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 border border-gray-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setShowConfirmLeave(false);
                    handleLeave();
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 border border-red-400"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}

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
