import { useEffect, useState } from "react";
import { getConversations } from "../api/chatService";
import { getConversationInfo } from "../utils/chatHelpers";
import UserList from "../components/UserList";
import { Box, Typography } from "@mui/material";

const ChatsPage = () => {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getConversations();
            const conversationIdsList = (res.data.participating);
            conversationIdsList.map(async conversationId => {
                const conversation = await getConversationInfo(conversationId);
                setConversations(prevConversations => [...prevConversations, { conversationId, ...conversation }])
            })
        };
        fetchData();
    }, []);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: {
                xs: 'flex-start',
                md: 'center'
            },
            gap: 2,
            height: 'calc(100vh - 80px)',
            overflowY: 'auto',
            width: '100%',
        }}>
            {/* <Typography variant="h5">Konversationer</Typography> */}
            <UserList conversations={conversations ? conversations : []} />
            {!conversations || conversations.length === 0 &&
                <Box>
                    <Typography variant="body1">Gå till menyn och starta en konversation</Typography>
                </Box>
            }
        </Box>
    )
}
export default ChatsPage