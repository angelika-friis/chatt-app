import { useEffect, useState } from "react";
import { deleteUser, updateUser } from "../api/usersService";
import {
    List, Alert, Button, DialogActions, Box, Typography, Dialog, DialogTitle, DialogContent
} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { useLogout } from "../hooks/useLogout";
import { getUser } from "../api/usersService";
import AvatarEditor from "../components/AvatarEditor";
import EditableField from "../components/EditableField";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");
    const [alert, setAlert] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const logoutUser = useLogout();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const userId = JSON.parse(localStorage.getItem("userData")).id;
        const res = await getUser(userId);
        const fetchedUser = res.data[0];
        setUser(fetchedUser);
        setAvatarPreview(fetchedUser.avatar);
    };

    const startEdit = (field) => {
        setEditingField(field);
        setTempValue(user[field] || "");
        if (field === "avatar") setAvatarPreview(user.avatar || "");
    };

    const cancelEdit = () => {
        setEditingField(null);
        setTempValue("");
        setAvatarPreview(user.avatar);
    };

    const saveEdit = async () => {
        if (!editingField || tempValue.trim() === "" || tempValue === user[editingField]) {
            cancelEdit();
            return;
        }
        const res = await updateUser(user.id, { [editingField]: tempValue });
        if (res.success) {
            fetchUser();
            setAlert(<Alert icon={<CheckIcon />} severity="success">Information uppdaterad. Logga ut för att se ändringarna.</Alert>);
        } else {
            setAlert(<Alert severity="error">{res.message || "Något gick fel"}</Alert>);
        }
        cancelEdit();
    };

    const handleDeleteProfile = async () => {
        const res = await deleteUser(user.id);
        if (res.success) logoutUser();
        else setAlert(<Alert severity="error">{res.message || "Något gick fel"}</Alert>);
    };

    if (!user) return null;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, p: 3, maxWidth: 400, margin: "auto" }}>
            {alert}

            <AvatarEditor
                avatar={tempValue}
                preview={avatarPreview}
                isEditing={editingField === "avatar"}
                onEdit={() => startEdit("avatar")}
                onChange={(val) => { setTempValue(val); setAvatarPreview(val); }}
                onSave={saveEdit}
                onCancel={cancelEdit}
            />

            <List sx={{ width: "100%" }}>
                <EditableField
                    label={user.username}
                    value={tempValue}
                    isEditing={editingField === "username"}
                    onEdit={() => startEdit("username")}
                    onChange={setTempValue}
                    onSave={saveEdit}
                    onCancel={cancelEdit}
                />
                <EditableField
                    label={user.email}
                    value={tempValue}
                    isEditing={editingField === "email"}
                    onEdit={() => startEdit("email")}
                    onChange={setTempValue}
                    onSave={saveEdit}
                    onCancel={cancelEdit}
                />
            </List>

            <Button
                variant="outlined"
                onClick={() => setDialogOpen(true)}
                sx={{ color: 'secondary.main', borderColor: 'secondary.main', '&:hover': { color: 'secondary.dark' } }}
                fullWidth
            >
                Radera profil
            </Button>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Vill du verkligen radera din profil?</DialogTitle>
                <DialogContent>
                    <Typography>Detta kan inte ångras.</Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2, flexDirection: "column", gap: 1 }}>
                    <Button
                        variant="outlined"
                        onClick={() => setDialogOpen(false)}
                        sx={{ color: 'secondary.main', borderColor: 'secondary.main', '&:hover': { color: 'secondary.dark' }, width: "100%" }}
                    >
                        Avbryt
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleDeleteProfile}
                        sx={{ backgroundColor: 'secondary.main', color: 'white', '&:hover': { bgcolor: 'secondary.dark' }, width: "100%" }}
                    >
                        Radera
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserProfile;
