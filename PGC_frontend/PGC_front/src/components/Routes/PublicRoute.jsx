import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../services/authService";

function PublicRoute({ children }) {
    if (isAuthenticated()) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default PublicRoute;