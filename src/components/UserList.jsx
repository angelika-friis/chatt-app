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
                        gridTemplateColumns: "1fr 1fr",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <ListItemAvatar sx={{ mr: 2 }}>
                        <AvatarGroup max={2}>
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
                        sx={{ color: "black", fontSize: "2rem" }}
                        primary={conversation.users.map(user => user.username).join(', ')}
                    />
                </ListItem>
            ))}
        </List>
    );
}
