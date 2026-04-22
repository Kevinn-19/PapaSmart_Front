export const loginUser = async (email, password) => {
    const response = await fetch("http://localhost:8000/usuarios/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            correo: email, // 🔥 AQUÍ ESTÁ LA CLAVE
            password: password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        console.log("Error backend:", data); // 🔍 DEBUG
        throw new Error(data.detail || "Error al iniciar sesión");
    }

    return data;
};

export const getToken = () => localStorage.getItem("token");

export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};