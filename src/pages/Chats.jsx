import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConversations } from "../api/chatService";
import { getUniqueUsersInConversation } from "../utils/chatHelpers";
import { Avatar, AvatarGroup, Box, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

const Chats = () => {
    const [conversationIds, setConversationIds] = useState(null);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const c = await getConversations();
            setConversationIds(c.data.participating);
            c.data.participating.map(async conversationId => {
                const users = await getUniqueUsersInConversation(conversationId);
                setConversations(prevConversations => [...prevConversations, { conversationId, users }])
            })
        };
        fetchData();
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 2, gap: 2 }}>
            {conversationIds &&
                <List>
                    {conversations.map(conversation => (
                        <ListItem
                            key={conversation.conversationId}
                            button
                            component={Link}
                            to={`/conversation/${conversation.conversationId}`}
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "200px 200px",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <ListItemAvatar sx={{ mr: 2 }}>
                                <AvatarGroup max={3}>
                                    {conversation.users.map(user => (
                                        <Avatar
                                            key={user.username}
                                            alt={user.username}
                                            src={user.avatar}
                                            sx={{ height: 50, width: 50 }}
                                        >
                                            {user.username[0].toUpperCase()}
                                        </Avatar>
                                    ))}
                                </AvatarGroup>
                            </ListItemAvatar>
                            <ListItemText
                                primary={conversation.users.map(user => user.username).join(', ')}
                            />
                        </ListItem>
                    ))}
                </List>
            }
            {!conversationIds || conversationIds.length === 0 &&
                <div>
                    <p>Gå till menyn och starta en konversation</p>
                </div>
            }
        </Box>
    )
}
export default Chats