import { jwtDecode } from "jwt-decode";

const BASE_URL = 'https://chatify-api.up.railway.app';

const fetchClient = async (url, options = {}) => {
    const jwtToken = localStorage.getItem('jwtToken');

    const config = {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
            ...(options.headers || {}),
        },
    };

    if (!isTokenValid(jwtToken)) {
        return { success: false, message: 'Session expired. Please sign in' };
    }

    try {
        const res = await fetch(BASE_URL + url, config);
        const data = await res.json();

        if (res.ok) {
            return { success: true, data };
        }

        if (res.status === 401) {
            return { success: false, message: 'Authentication failed' };
        }
        return { success: false, message: data.error || 'Unknown error' };
    } catch (error) {
        console.error('fetchClient error:', error);
        return { success: false, message: error.message };
    }
};

function isTokenValid(token) {
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const expiresAt = decoded.exp * 1000;
        return Date.now() < expiresAt;
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export default fetchClient;