import { getUser, logout } from "../../services/authService";

function Dashboard() {
    const user = getUser();

    const handleLogout = () => {
        logout();
        window.location.href = "/";
    };
    return (
        <div className="p-10">
            <div>
                <h1>Bienvenido {user?.nombres}</h1>

                {/* 🌱 Funcionalidad de usuario (ADMIN TAMBIÉN LA VE) */}
                {(user?.rol_id === 2 || user?.rol_id === 1) && (
                    <p>Panel de usuario 🌱</p>
                )}

                {/* 🔥 Funcionalidad exclusiva de admin */}
                {user?.rol_id === 1 && (
                    <p>Panel de administrador 🔥</p>
                )}
            </div>

            <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
                Cerrar sesión
            </button>
        </div>
    );
}

export default Dashboard;