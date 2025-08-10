import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { inviteUser, searchUsers } from "../api/usersService";
import {
    Avatar,
    AppBar,
    Box,
    Drawer,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    TextField,
    Toolbar,
    Typography,
    List,
    ListItemIcon,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemButton,
} from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import Logout from '@mui/icons-material/Logout';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CloseIcon from "@mui/icons-material/Close";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

export default function Header() {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem("jwtToken");
    const decoded = jwtDecode(token);
    const [openDialog, setOpenDialog] = useState(false);
    const [query, setQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const showBackButton = ["/conversation/", "/invites"].some(path =>
        location.pathname.startsWith(path)
    );

    const handleOpenDialog = () => setOpenDialog(true);

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setQuery("");
        setSearchResult([]);
    };

    const handleChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim().length === 0) {
            setSearchResult([]);
            return;
        }

        try {
            const res = await searchUsers(value);
            setSearchResult(res.data || []);
        } catch (error) {
            console.error("Sökningen misslyckades:", error);
            setSearchResult([]);
        }
    };

    const handleAddContact = async (e, user) => {
        e.preventDefault();
        try {
            const res = await inviteUser(user.userId);
            if (!res.success) {
                console.error("Kunde inte bjuda in användaren");
            } else {
                console.log(`${user.username} inbjuden!`);
                handleCloseDialog();
            }
        } catch (error) {
            console.error("Kunde inte bjuda in användaren:", error);
        }
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const chatMenuItems = [
        { text: "Ny konversation", icon: <AddRoundedIcon />, action: "add-conversation" },
        { text: "Medelandeförfrågningar", icon: <EmailOutlinedIcon />, path: "/invites" }
    ]

    const UserMenuItems = [
        { text: "Ändra profil", icon: <ManageAccountsRoundedIcon />, path: "/profile" },
        { text: "Logga ut", icon: <Logout />, action: "logout" },
    ];

    const menuList = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem key="avatar">
                    <Avatar
                        alt={user?.username} src={user?.avatarUrl || "https://cdn-icons-png.freepik.com/512/4159/4159471.png"}
                        sx={{ width: 100, height: 100 }}
                    />
                </ListItem>
                <ListItem key="username">
                    <Typography variant="body1">{user?.username}</Typography>
                </ListItem>
            </List>
            <List>
                {chatMenuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                if (item.action === "add-conversation") {
                                    handleOpenDialog();
                                } else {
                                    navigate(item.path);
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
                {UserMenuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                if (item.action === "logout") {
                                    localStorage.removeItem("jwtToken");
                                    navigate("/login");
                                } else {
                                    navigate(item.path);
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
    );

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("jwtToken");
            const decoded = jwtDecode(token);
            console.info(decoded);
            setUser({ username: decoded.user, avatarUrl: "https://i.pravatar.cc/40" });
        }
        fetchUser();
    }, [])



    return (
        <header>
            <div>
                <AppBar position="static">
                    <Toolbar>
                        {showBackButton && (
                            <IconButton
                                color="inherit"
                                onClick={() => navigate(-1)}
                                aria-label="go back"
                            >
                                <ArrowBackIosNewIcon />
                            </IconButton>
                        )}
                        <Box
                            sx={{
                                marginLeft: "auto",
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                gap: 1,
                            }}
                            onClick={toggleDrawer(true)}
                        >
                            <MenuRoundedIcon />
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer
                    anchor="right"
                    open={open}
                    onClose={toggleDrawer(false)}
                >
                    {menuList}
                </Drawer>
                <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                    <DialogTitle sx={{ m: 0, p: 2 }}>
                        Sök efter användare
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseDialog}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500]
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            autoFocus
                            margin="dense"
                            variant="outlined"
                            label="Användarnamn"
                            value={query}
                            onChange={handleChange}
                        />
                        {searchResult.length > 0 && (
                            <List>
                                {searchResult.map((user) => (
                                    <ListItem
                                        key={user.userId}
                                        secondaryAction={
                                            <IconButton
                                                edge="end"
                                                color="primary"
                                                onClick={(e) => handleAddContact(e, user)}
                                            >
                                                <AddCircleRoundedIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemAvatar>
                                            <Avatar alt={user.username} src={user.avatar}>
                                                {user.username[0].toUpperCase()}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={user.username} />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </header>
    );
}
