import fetchClient from './fetchClient';

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