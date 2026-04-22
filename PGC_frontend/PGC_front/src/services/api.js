import { getToken } from "../services/authService";

const API_URL = "http://localhost:8000";

export const apiRequest = async (endpoint, options = {}) => {
    const token = getToken();

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Error en la petición");
    }

    return data;
};