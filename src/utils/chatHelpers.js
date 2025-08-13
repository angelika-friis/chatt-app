import { getMessages } from "../api/chatService";
import { getUser } from "../api/usersService";

export const enrichMessages = async (conversationId) => {
    const { data: rawMessages } = await getMessages(conversationId);

    // Hitta unika användar-ID:n
    const uniqueUserIds = [...new Set(rawMessages.map(msg => msg.userId))];

    // Hämta alla unika användare
    const userResponses = await Promise.all(
        uniqueUserIds.map(userId => getUser(userId))
    );

    // Bygg en cache med userId → user-objekt
    const userCache = {};
    userResponses.forEach(response => {
        const user = response.data[0]; // om getUser alltid returnerar en lista
        userCache[user.id] = user;
    });

    // Mappa in användare i varje meddelande
    return rawMessages.map(msg => ({
        ...msg,
        user: userCache[msg.userId],
    }));
};

export const getUniqueUsersInConversation = async (conversationId) => {
    const { data: rawMessages } = await getMessages(conversationId);

    const currentUser = JSON.parse(localStorage.getItem("userData"));
    const currentId = currentUser.id;

    // Hitta unika användar-ID:n
    const uniqueUserIds = [...new Set(rawMessages.map(msg => msg.userId))]
        .filter(userId => userId !== currentId);


    // Hämta alla unika användare
    const userResponses = await Promise.all(
        uniqueUserIds.map(userId => getUser(userId))
    );

    // Returnera en platt lista med användarobjekt
    return userResponses.map(response => response.data[0]);
};
