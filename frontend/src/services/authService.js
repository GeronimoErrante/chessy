import axios from "axios";

const BASE_URL = "http://localhost:8000/auth/";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}register/`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Error de red o servidor." };
  }
};


export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}login/`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Error de red o servidor." };
  }
};

export const getCurrentUser = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Error de red o servidor." };
  }
}