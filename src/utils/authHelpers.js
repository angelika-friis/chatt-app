import { jwtDecode } from "jwt-decode";

export const logoutUser = () => {
    localStorage.removeItem('jwtToken');
}

export const isTokenValid = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
        logoutUser();
        return false;
    }

    try {
        const decoded = jwtDecode(token);
        const expiresAt = decoded.exp * 1000;
        return Date.now() < expiresAt;
    } catch (error) {
        console.error(`Error validating jwt token: ${error}`)
        return false;
    }
}