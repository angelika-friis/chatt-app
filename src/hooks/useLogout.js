import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const navigate = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userData");
        navigate("/login");
    };

    return logoutUser;
};
