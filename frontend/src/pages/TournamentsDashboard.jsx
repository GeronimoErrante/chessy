import { useState, useEffect } from "react";
import { getTournamentChoices, getTournaments, createTournament } from "../api/tournaments"; 
import { getModeIcon, mapTournamentStatus } from "../utils/tournaments";
import { formatTournamentDate } from "../utils/formatDate";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import CreateTournamentModal from "../modals/CreateTournamentModal";


export default function ChessTournaments() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [modes, setModes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [form, setForm] = useState({
    name: "",
    start_date: "",
    start_time: "",
    prize: "",
    mode: "",
  });

  useEffect(() => {
    getTournamentChoices()
      .then(({ modes, statuses }) => {
        setModes(modes);
        setStatuses(statuses);
      })
      .catch((err) => console.error("Error fetching choices:", err));
  }, []);

  const loadTournaments = (status, mode) => {
    const query = new URLSearchParams();
    if (status) query.append("status", status);
    if (mode) query.append("mode", mode);

    getTournaments(query.toString())
      .then((data) => setTournaments(data))
      .catch((err) => console.error("Error fetching tournaments:", err));
  };

  useEffect(() => {
    loadTournaments(selectedStatus, selectedMode);
  }, [selectedStatus, selectedMode]);

  const handleCreate = async (formData) => {
    try {
    const token = localStorage.getItem("accessToken");
    await createTournament(formData, token);
    setShowModal(false);
    loadTournaments(selectedStatus, selectedMode);
  } catch (err) {
    console.error("Error creando torneo:", err);
    alert("Error al crear el torneo.");
  }
};

  return (
    <Layout>
      <div className="flex justify-center mb-4 sm:mb-6 px-2 sm:px-0">
        <button
          className="bg-yellow-200 text-black font-semibold py-2 px-4 sm:px-6 text-sm sm:text-base rounded w-full sm:w-auto"
          onClick={() => setShowModal(true)}>
          Crear Torneo
        </button>
      </div>
      
      <div className="mb-4 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center px-2 sm:px-0">
        <div className="w-full sm:w-auto">
          <label className="block mb-1 font-semibold text-base sm:text-lg" htmlFor="status-select">
            Estado
          </label>
          <select
            id="status-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-black text-white p-2 rounded border border-gray-700 w-full"
          >
            <option value="">Todos</option>
            {statuses.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <label className="block mb-1 font-semibold text-base sm:text-lg" htmlFor="mode-select">
            Modo
          </label>
          <select
            id="mode-select"
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            className="bg-black text-white p-2 rounded border border-gray-700 w-full"
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

      <div className="overflow-x-auto px-2 sm:px-0">
        <table className="w-full border-collapse min-w-full">
          <thead>
            <tr className="text-left text-lg sm:text-xl md:text-2xl font-bold">
              <th className="py-3 sm:py-4 px-2 sm:px-4">TORNEO</th>
              <th className="py-3 sm:py-4 px-2 sm:px-4">FECHA DE INICIO</th>
              <th className="py-3 sm:py-4 px-2 sm:px-4">MODO</th>
              <th className="py-3 sm:py-4 px-2 sm:px-4">PREMIO</th>
            </tr>
          </thead>
          <tbody>
            {tournaments.map((tournament, index) => (
              <tr
                key={index}
                className="border-t border-gray-800 hover:bg-gray-900 transition-colors"
              >
                <td
                  className="py-3 sm:py-4 px-2 sm:px-4 cursor-pointer hover:underline text-sm sm:text-base"
                  onClick={() => navigate(`/tournaments/${tournament.id}`)}
                >
                  {tournament.name} ({mapTournamentStatus(tournament.status)})
                </td>

                <td className="py-3 sm:py-4 px-2 sm:px-4 text-sm sm:text-base">
                  {formatTournamentDate(tournament.start_date, tournament.start_time)}
                </td>
                <td className="py-3 sm:py-4 px-2 sm:px-4 text-sm sm:text-base">{getModeIcon(tournament.mode)}</td>
                <td className="py-3 sm:py-4 px-2 sm:px-4 text-sm sm:text-base">
                  {tournament.prize === "NONE" ? (
                    <div className="bg-white text-black px-2 py-1 inline-block text-xs sm:text-sm">NONE</div>
                  ) : (
                    tournament.prize
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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