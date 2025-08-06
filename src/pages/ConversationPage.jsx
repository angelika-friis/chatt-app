import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createMessage, deleteMessage, getMessages } from "../api/chatService";
import { MdDelete } from "react-icons/md";
import { GoPaperAirplane } from "react-icons/go";
import { getUser } from "../api/usersService";
import { MdOutlineArrowBackIos } from "react-icons/md";

const ConversationPage = () => {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);

    const id = useParams();

    useEffect(() => {
        fetchMessages();
    }, [])

    const fetchMessages = async () => {
        const { data: rawMessages } = await getMessages(id.id);

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
        const enrichedMessages = rawMessages.map(msg => ({
            ...msg,
            user: userCache[msg.userId],
        }));

        setMessages(enrichedMessages);
    }

    const handleInputChange = (e) => {
        setText(e.target.value);
    }

    const handleSend = () => {
        createMessage(id.id, text);
        setText("");
        fetchMessages();
    }

    const handleDeleteMessage = async (messageId) => {
        deleteMessage(messageId);
        fetchMessages();
    }

    return (
        <div>
            <Link to="/chats">
                <MdOutlineArrowBackIos />
            </Link>
            <ul>
                {messages.length > 0 && messages.map(message => (
                    <li key={message.id}>
                        <p>{new Date(message.createdAt).toLocaleString()}</p>
                        <p>{message.user.username}</p>
                        {message.user.avatar
                            ? <img
                                src={message.user.avatar}
                                height={50}
                            ></img>
                            : <img
                                src="https://cdn-icons-png.freepik.com/512/4159/4159471.png"
                                height={50}
                            ></img>
                        }
                        <p>{message.text}</p>
                        <button onClick={(e) => handleDeleteMessage(message.id)}>
                            {<MdDelete />}
                        </button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={text}
                onChange={handleInputChange}
            />
            <button
                onClick={handleSend}
            >
                <GoPaperAirplane />
            </button>
        </div>
    )
}

export default ConversationPage;