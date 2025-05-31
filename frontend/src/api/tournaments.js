import axios from "axios";

// const BASE_URL = "http://localhost:8000";

const API_URL = import.meta.env.VITE_API_URL;

export const getTournaments = async () => {
  try {
    const response = await axios.get(`${API_URL}/tournaments/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTournamentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/tournaments/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTournament = async (tournamentData, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/tournaments/`,
      tournamentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const joinTournament = async (tournamentId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/tournaments/${tournamentId}/join/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const leaveTournament = async (tournamentId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/tournaments/${tournamentId}/leave/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const startTournament = async (tournamentId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/tournaments/${tournamentId}/start/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export async function getActiveTournaments() {
  const response = await axios.get(`${API_URL}/tournaments/active/`); // -> Pendientes o en juego.
  return response.data;
}

export async function getTournamentChoices() {
  const res = await fetch(`${API_URL}/tournaments/choices/`);
  return res.json();
}

export async function getTournamentsByFilters({ status, mode }) {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (mode) params.append("mode", mode);

  const res = await fetch(`${API_URL}/tournaments/?${params}/`);
  return res.json();
}