import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConversations } from "../api/chatService";

const Chats = () => {
    const [conversations, setConversations] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const c = await getConversations();
            setConversations(c.data.participating);
        };
        fetchData();
    }, [])

    return (
        <div>
            {conversations &&
                <ul>
                    {conversations.map(conversation => (
                        <li key={conversation}>
                            <Link to={`/conversation/${conversation}`}>{conversation}</Link>
                        </li>
                    ))}
                </ul>}
        </div>
    )
}
export default Chats