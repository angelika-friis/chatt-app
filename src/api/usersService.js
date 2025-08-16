import fetchClient from './fetchClient';

export const searchUsers = async (query) => {
    const res = await fetchClient(`/users?username=${query}`, {
        method: "GET",
    });
    return res;
}

export const getUser = async (userId) => {
    const res = await fetchClient(`/users/${userId}`, {
        method: "GET"
    });
    return res;
}

export const updateUser = async (userId, updatedData) => {
    const res = await fetchClient(`/user`, {
        method: "PUT",
        body: JSON.stringify({ userId, updatedData })
    });
    return res;
}

export const deleteUser = async (userId) => {
    const res = await fetchClient(`/users/${userId}`, {
        method: "DELETE",
    });
    return res;
}