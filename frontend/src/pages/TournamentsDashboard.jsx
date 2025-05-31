import { useState, useEffect } from "react";
import { getTournamentChoices, getTournaments, createTournament } from "../api/tournaments"; 
import { getModeIcon, mapTournamentStatus } from "../utils/tournaments";
import { formatTournamentDate } from "../utils/formatDate";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import CreateTournamentModal from "../modals/CreateTournamentModal";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { useMessageHandler } from "../utils/messageHandler";

export default function ChessTournaments() {
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

  const [tournaments, setTournaments] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [modes, setModes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    start_date: "",
    start_time: "",
    prize: "",
    mode: "",
    description: "",
    players_amount: 2,
  });

  useEffect(() => {
    setIsLoading(true);
    getTournamentChoices()
      .then(({ modes, statuses }) => {
        setModes(modes);
        setStatuses(statuses);
      })
      .catch((err) => {
        showError("Error al cargar las opciones del torneo");
        console.error("Error fetching choices:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const loadTournaments = (status, mode) => {
    setIsLoading(true);
    const query = new URLSearchParams();
    if (status) query.append("status", status);
    if (mode) query.append("mode", mode);

    getTournaments(query.toString())
      .then((data) => setTournaments(data))
      .catch((err) => {
        showError("Error al cargar los torneos");
        console.error("Error fetching tournaments:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadTournaments(selectedStatus, selectedMode);
  }, [selectedStatus, selectedMode]);

  const handleCreate = async (formData) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      await createTournament(formData, token);
      showSuccess("Torneo creado exitosamente");
      setShowModal(false);
      loadTournaments(selectedStatus, selectedMode);
    } catch (err) {
      const errorMessage = err.response?.data?.non_field_errors?.[0] || 
                          err.response?.data?.detail?.[0] || 
                          "Error al crear el torneo";
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateClick = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }
    setShowModal(true);
  };

  const handleTournamentClick = (tournamentId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }
    navigate(`/tournaments/${tournamentId}`);
  };

  return (
    <Layout>
      {isLoading && <Loader />}
      <div className="container mx-auto px-4 py-6 pb-20">
        <div className="space-y-4 mb-6">
          {error && <Alert message={errorMessage} type="error" onClose={clearMessages} />}
          {success && <Alert message={successMessage} type="success" onClose={clearMessages} />}
        </div>
        
        <div className="flex justify-center mb-6">
          <button
            className="bg-yellow-200 text-black font-semibold py-2 px-6 rounded-lg hover:bg-yellow-300 transition-colors w-full max-w-xs"
            onClick={handleCreateClick}>
            Crear Torneo
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="w-full">
            <label className="block mb-2 font-semibold text-lg" htmlFor="status-select">
              Estado
            </label>
            <select
              id="status-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-black text-white p-2 rounded-lg border border-gray-700 w-full focus:outline-none focus:border-yellow-200"
            >
              <option value="">Todos</option>
              {statuses.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label className="block mb-2 font-semibold text-lg" htmlFor="mode-select">
              Modo
            </label>
            <select
              id="mode-select"
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="bg-black text-white p-2 rounded-lg border border-gray-700 w-full focus:outline-none focus:border-yellow-200"
            >
              <option value="">Todos</option>
              {modes.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-800 mb-20">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-900">
                <th className="py-4 px-4 text-left text-lg font-bold">TORNEO</th>
                <th className="py-4 px-4 text-left text-lg font-bold hidden md:table-cell">FECHA DE INICIO</th>
                <th className="py-4 px-4 text-left text-lg font-bold">MODO</th>
                <th className="py-4 px-4 text-left text-lg font-bold hidden sm:table-cell">PREMIO</th>
              </tr>
            </thead>
            <tbody>
              {tournaments.map((tournament, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-800 hover:bg-gray-900 transition-colors"
                >
                  <td
                    className="py-4 px-4 cursor-pointer hover:underline"
                    onClick={() => handleTournamentClick(tournament.id)}
                  >
                    <div className="font-medium">{tournament.name}</div>
                    <div className="text-sm text-gray-400">{mapTournamentStatus(tournament.status)}</div>
                    <div className="md:hidden text-sm text-gray-400 mt-1">
                      {formatTournamentDate(tournament.start_date, tournament.start_time)}
                    </div>
                  </td>

                  <td className="py-4 px-4 hidden md:table-cell">
                    {formatTournamentDate(tournament.start_date, tournament.start_time)}
                  </td>
                  <td className="py-4 px-4">{getModeIcon(tournament.mode)}</td>
                  <td className="py-4 px-4 hidden sm:table-cell">
                    {tournament.prize === "NONE" ? (
                      <div className="bg-white text-black px-3 py-1 rounded-full text-sm inline-block">NONE</div>
                    ) : (
                      tournament.prize
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CreateTournamentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreate}
        modes={modes}
        form={form}
        setForm={setForm}
      />
    </Layout>
  );
}