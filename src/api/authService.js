const BASE_URL = 'https://chatify-api.up.railway.app';

export const getCsrfToken = async () => {
    const res = await fetch(BASE_URL + '/csrf', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    const data = await res.json();
    return data.csrfToken;
};

export const registerUser = async (form) => {
    try {
        const csrfToken = await getCsrfToken();
        const formdata = { ...form, csrfToken };

        const res = await fetch(BASE_URL + `/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formdata),
        });

        const data = await res.json();
        if (!res.ok) {
            return { success: false, message: data.error };
        }

        return { success: true, data };
    } catch (error) {
        console.error('registerUser error:', error);
        return { success: false, message: error.message };
    }
};