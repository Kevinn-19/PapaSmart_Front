import { Navigate } from "react-router-dom";
import { isAuthenticated, getUser } from "../../services/authService";

function ProtectedRoute({ children, allowedRole }) {
    const isAuth = isAuthenticated();
    const user = getUser();

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    // Usamos rol_id como confirmaste
    const userRol = user ? Number(user.rol_id) : 0;

    /**
     * LÓGICA DE BLOQUEO ESTRICTO:
     * Si la ruta requiere un rol específico (allowedRole) 
     * y el rol del usuario NO coincide exactamente, se bloquea.
     */
    if (allowedRole && userRol !== Number(allowedRole)) {
        // Si el admin (1) intenta entrar a una ruta de usuario (2), 
        // lo mandamos a su propio dashboard de admin.
        if (userRol === 1) {
            return <Navigate to="/admin-dashboard" replace />;
        }

        // Para cualquier otro caso de rol no autorizado
        return <Navigate to="/access-denied" replace />;
    }

    return children;
}

export default ProtectedRoute;