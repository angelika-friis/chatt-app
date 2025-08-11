import { useEffect, useState } from "react";
import { getUser, updateUser } from "../api/usersService";
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, TextField, Alert } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckIcon from '@mui/icons-material/Check';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState("");
    const [alert, setAlert] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("jwtToken");
            const decoded = jwtDecode(token);
            const userData = await getUser(decoded.id);
            const fetchedUser = userData.data[0];
            setUser(fetchedUser);
            setAvatarPreview(fetchedUser.avatar);
        };
        fetchData();
    }, []);

    const handleEditClick = (field) => {
        setEditingField(field);
        setTempValue(user[field] || "");
        if (field === "avatar") {
            setAvatarPreview(user.avatar || "");
        }
    };

    const handleSave = async () => {
        if (editingField) {
            const updatedData = { [editingField]: tempValue };

            const res = await updateUser(user.id, updatedData);
            if (res.success) {
                setUser({ ...user, [editingField]: tempValue });
                setAlert(
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                        Information uppdaterad
                    </Alert>
                );
            } else {
                setAlert(
                    <Alert severity="error">{res.message || "Något gick fel"}</Alert>
                )
            }

            setEditingField(null);
            setTempValue("");
        }
    };

    return (
        <div>
            {alert}
            {user &&
                <List>
                    <ListItem
                        secondaryAction={
                            editingField === "username" ? (
                                <IconButton onClick={handleSave}>
                                    <CheckIcon />
                                </IconButton>
                            ) : (
                                <IconButton onClick={() => handleEditClick("username")}>
                                    <EditRoundedIcon />
                                </IconButton>
                            )
                        }
                    >
                        {editingField === "username" ? (
                            <TextField
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                size="small"
                            />
                        ) : (
                            <ListItemText>{user.username}</ListItemText>
                        )}
                    </ListItem>

                    {/* EMAIL */}
                    <ListItem
                        secondaryAction={
                            editingField === "email" ? (
                                <IconButton onClick={handleSave}>
                                    <CheckIcon />
                                </IconButton>
                            ) : (
                                <IconButton onClick={() => handleEditClick("email")}>
                                    <EditRoundedIcon />
                                </IconButton>
                            )
                        }
                    >
                        {editingField === "email" ? (
                            <TextField
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                size="small"
                            />
                        ) : (
                            <ListItemText>{user.email}</ListItemText>
                        )}
                    </ListItem>

                    {/* AVATAR */}
                    <ListItem
                        secondaryAction={
                            editingField === "avatar" ? (
                                <IconButton onClick={handleSave}>
                                    <CheckIcon />
                                </IconButton>
                            ) : (
                                <IconButton onClick={() => handleEditClick("avatar")}>
                                    <EditRoundedIcon />
                                </IconButton>
                            )
                        }
                    >
                        <ListItemAvatar>
                            <Avatar
                                alt="profile picture"
                                src={avatarPreview}
                                sx={{ width: 100, height: 100 }}
                            >
                                {user.username[0].toUpperCase()}
                            </Avatar>
                        </ListItemAvatar>
                        {editingField === "avatar" && (
                            <TextField
                                value={tempValue}
                                onChange={(e) => {
                                    setTempValue(e.target.value);
                                    setAvatarPreview(e.target.value);
                                }}
                                size="small"
                                placeholder="Ny avatar-URL"
                            />
                        )}
                    </ListItem>
                </List>
            }
        </div>
    );
};

export default UserProfile;
