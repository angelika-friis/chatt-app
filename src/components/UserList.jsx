import { List, ListItem, ListItemAvatar, ListItemText, Avatar, AvatarGroup } from '@mui/material';
import { Link } from 'react-router-dom';

export default function UserList({ conversations }) {

    return (
        <List>
            {conversations.map(conversation => (
                <ListItem
                    key={conversation.conversationId}
                    button="true"
                    component={Link}
                    to={`/conversation/${conversation.conversationId}`}
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "100px 1fr",
                        alignItems: "center",
                        gap: { xs: 1, sm: 3 },
                    }}
                >
                    <ListItemAvatar sx={{ mr: 2 }}>
                        <AvatarGroup max={2}>
                            {conversation.users && conversation.users.length > 0 ? (
                                conversation.users.map((user) => (
                                    <Avatar
                                        key={user.username}
                                        alt={user.username}
                                        src={user.avatar || undefined}
                                        sx={{ height: 50, width: 50, }}
                                    >
                                        {Array.from(message.user.username)[0].toUpperCase?.() || ""}
                                    </Avatar>
                                ))
                            ) : (
                                <Avatar sx={{ height: 50, width: 50 }} />
                            )}
                        </AvatarGroup>
                    </ListItemAvatar>
                    <ListItemText
                        sx={{ color: "black", fontSize: "2rem" }}
                        primary={
                            conversation.users.length > 0
                                ? conversation.users.map(user => user.username).join(", ")
                                : "Inbjudan ej besvarad"
                        }
                        secondary={
                            conversation.lastMessage?.text
                                ? conversation.lastMessage.text.length > 50
                                    ? conversation.lastMessage.text.substring(0, 50) + "..."
                                    : conversation.lastMessage.text
                                : "Inga meddelanden än"
                        }
                    />

                </ListItem>
            ))}
        </List>
    );
}
