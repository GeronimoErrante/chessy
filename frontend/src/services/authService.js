import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL + "/auth/";


const errorTranslations = {
  "A user with that username already exists.": "Ya existe un usuario con ese nombre.",
  "user with this email address already exists.": "Ya existe un usuario con ese email.",
  "This password is too short. It must contain at least 8 characters.": "La contraseña es demasiado corta. Debe contener al menos 8 caracteres.",
  "This password is too common.": "Esta contraseña es demasiado común.",
  "This password is entirely numeric.": "La contraseña no puede ser completamente numérica.",
  "The two password fields didn't match.": "Las contraseñas no coinciden.",
  "This field may not be blank.": "Este campo es obligatorio.",
  "This field is required.": "Este campo es obligatorio.",
  "Enter a valid email address.": "Ingrese un email válido.",
  "Unable to log in with provided credentials.": "Credenciales incorrectas.",
  "Invalid token.": "Token inválido.",
  "Token is invalid or expired.": "El token es inválido o ha expirado.",
  "No active account found with the given credentials.": "No se encontró una cuenta activa con las credenciales proporcionadas."
};

const translateError = (message) => {
  return errorTranslations[message] || message;
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}register/`, userData);
    return response.data;
  } catch (error) {
    const errorData = error.response?.data;
    if (errorData) {
      const firstError = Object.entries(errorData).reduce((first, [field, messages]) => {
        if (first) return first;
        const message = Array.isArray(messages) ? messages[0] : messages;
        const fieldName = field === 'password2' ? 'confirmación de contraseña' :
                        field === 'non_field_errors' ? '' :
                        field;
        const translatedMessage = translateError(message);
        return fieldName ? `${fieldName}: ${translatedMessage}` : translatedMessage;
      }, null);
      
      throw new Error(firstError || "Error al registrar.");
    }
    throw new Error("Error de red o servidor.");
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}login/`, credentials);
    return response.data;
  } catch (error) {
    const errorData = error.response?.data;
    if (errorData) {
      const message = errorData.detail || errorData.error || "Error al iniciar sesión";
      throw new Error(translateError(message));
    }
    throw new Error("Error de red o servidor.");
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
    const errorData = error.response?.data;
    if (errorData) {
      const message = errorData.detail || errorData.error || "Error al obtener usuario";
      throw new Error(translateError(message));
    }
    throw new Error("Error de red o servidor.");
  }
}

export const logoutUser = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const checkAuth = (token) => {
  if (!token) {
    throw new Error("Debes iniciar sesión para realizar esta acción");
  }
  return token;
};