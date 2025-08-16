import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import UserList from "../components/UserList";
import { getUniqueUsersInConversation } from "../utils/chatHelpers";

const InvitePage = () => {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const fetchInvites = async () => {
            const fetchedUser = JSON.parse(localStorage.getItem("userData"));
            const invites = JSON.parse(fetchedUser.invite)
            invites.map(async invite => {
                const users = await getUniqueUsersInConversation(invite.conversationId);
                setConversations(prevConversations => [...prevConversations, { conversationId: invite.conversationId, users }])
            })
        }
        fetchInvites();
    }, [])


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 2,
            gap: 2
        }}>
            <Typography variant="h5">Dina inbjudningar</Typography>
            {conversations && <UserList conversations={conversations ? conversations : []} />}
            {!conversations || conversations.length === 0 &&
                <Box>
                    <Typography variant="body1">Inga inbjudningar än</Typography>
                </Box>
            }
        </Box>
    );
}
export default InvitePage