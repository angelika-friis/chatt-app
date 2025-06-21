import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createMessage, getMessages } from "../api/chatService";

const ConversationPage = () => {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);

    const id = useParams();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const res = await getMessages(id.id);
        setMessages(res.data);
    }

    const handleInputChange = (e) => {
        setText(e.target.value);
    }

    const handleSend = () => {
        createMessage(id.id, text);
        setText("");
        fetchData();
    }

    return (
        <div>
            <ul>
                {messages.length > 0 && messages.map(message => (
                    <li>
                        <p>{message.createdAt}</p>
                        <p>{message.text}</p>
                        <p>{message.userId}</p>
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
                Skicka
            </button>
        </div>
    )
}

export default ConversationPage;