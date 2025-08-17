import { Avatar, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Typography, Stack, Divider } from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import Logout from '@mui/icons-material/Logout';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

export default function MenuDrawer({ open, onClose, user, onAddConversation, onNavigate, onLogout }) {
    const chatMenuItems = [
        { text: "Hem", icon: <HomeRoundedIcon />, path: "/chats" },
        { text: "Ny konversation", icon: <AddRoundedIcon />, action: "add-conversation" },
        { text: "Meddelande-förfrågningar", icon: <EmailOutlinedIcon />, path: "/invites" }
    ];

    const userMenuItems = [
        { text: "Ändra profil", icon: <ManageAccountsRoundedIcon />, path: "/profile" },
        { text: "Logga ut", icon: <Logout />, action: "logout" },
    ];

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 250 }} role="presentation">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: 7,
                        mb: 3,
                        gap: 2,
                    }}
                >
                    <Avatar
                        alt={user?.username}
                        src={user?.avatar}
                        sx={{ width: 100, height: 100 }}
                    />
                    <Typography variant="body1" >{user?.user}</Typography>
                </Box>

                <Divider variant="middle" />

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

                <Divider variant="middle" />

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
