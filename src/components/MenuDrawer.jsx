import { Avatar, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Typography } from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import Logout from '@mui/icons-material/Logout';

export default function MenuDrawer({ open, onClose, user, onAddConversation, onNavigate, onLogout }) {
    const chatMenuItems = [
        { text: "Ny konversation", icon: <AddRoundedIcon />, action: "add-conversation" },
        { text: "Meddelandeförfrågningar", icon: <EmailOutlinedIcon />, path: "/invites" }
    ];

    const userMenuItems = [
        { text: "Ändra profil", icon: <ManageAccountsRoundedIcon />, path: "/profile" },
        { text: "Logga ut", icon: <Logout />, action: "logout" },
    ];

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 250 }} role="presentation">
                <List>
                    <ListItem>
                        <Avatar
                            alt={user?.username}
                            src={user?.avatarUrl}
                            sx={{ width: 100, height: 100 }}
                        >
                            {user?.user?.[0]?.toUpperCase()}
                        </Avatar>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1">{user?.user}</Typography>
                    </ListItem>
                </List>

                <List>
                    {chatMenuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    if (item.action === "add-conversation") {
                                        onAddConversation();
                                    } else {
                                        onNavigate(item.path);
                                    }
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <List>
                    {userMenuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    if (item.action === "logout") {
                                        onLogout();
                                    } else {
                                        onNavigate(item.path);
                                    }
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}
