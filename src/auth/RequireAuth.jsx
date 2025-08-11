import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isTokenValid } from "../utils/authHelpers";
import MainLayout from "../layouts/MainLayout";

function RequireAuth() {
    const location = useLocation();
    const isLoggedIn = isTokenValid();

    if (!isLoggedIn) {
        if (location.pathname === "/login" || location.pathname === "/register") {
            return <Outlet />;
        }
        return <Navigate to="/login" replace />;
    }

    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
}

export default RequireAuth;
