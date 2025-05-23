import axios from "axios";

const BASE_URL = "http://localhost:8000";

export async function getTournaments(query = "") {
  const response = await axios.get(`${BASE_URL}/tournaments/${query ? "?" + query : ""}`);
  return response.data;
}

export async function getActiveTournaments() {
  const response = await axios.get(`${BASE_URL}/tournaments/active/`); // -> Pendientes o en juego.
  return response.data;
}

export async function getTournamentById(tournamentId) {
  const response = await axios.get(`${BASE_URL}/tournaments/${tournamentId}/`);
  return response.data;
}

export async function getTournamentChoices() {
  const res = await fetch(`${BASE_URL}/tournaments/choices/`);
  return res.json();
}

export async function getTournamentsByFilters({ status, mode }) {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (mode) params.append("mode", mode);

  const res = await fetch(`${BASE_URL}/tournaments/?${params}`);
  return res.json();
}

export async function createTournament(data, token) {
  const response = await axios.post(
    `${BASE_URL}/tournaments/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function joinTournament(tournamentId, token) {
  const response = await axios.post(
    `${BASE_URL}/tournaments/${tournamentId}/join/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}