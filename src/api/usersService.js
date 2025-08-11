import fetchClient from './fetchClient';
import { v4 as uuidv4 } from 'uuid';

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

export const inviteUser = async (userId) => {
    const conversationId = uuidv4();

    const res = await fetchClient(`/invite/${userId}`, {
        method: "POST",
        body: JSON.stringify({ conversationId }),
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