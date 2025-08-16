import fetchClient from './fetchClient';
import { v4 as uuidv4 } from 'uuid';

export const getConversations = async () => {
    const res = await fetchClient(`/conversations`, {
        method: "GET",
    });
    return res;
}

export const getMessages = async (conversationId) => {
    const res = await fetchClient(`/messages?conversationId=${conversationId}`, {
        method: "GET",
    });
    return res;
}

export const createMessage = async (conversationId, text) => {
    const res = await fetchClient('/messages', {
        method: "POST",
        body: JSON.stringify({ text, conversationId }),
    });
    return res;
}

export const deleteMessage = async (messageId) => {
    const res = await fetchClient(`/messages/${messageId}`, {
        method: "DELETE",
    });
    return res;
}

export const createConversation = async (userId) => {
    const conversationId = uuidv4();

    const res = await fetchClient(`/invite/${userId}`, {
        method: "POST",
        body: JSON.stringify({ conversationId }),
    });

    res.conversationId = conversationId;

    return res;
};

export const inviteUserToConversation = async (userId, conversationId) => {
    const res = await fetchClient(`/invite/${userId}`, {
        method: "POST",
        body: JSON.stringify({ conversationId }),
    });
    return res;
};