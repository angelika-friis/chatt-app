import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { TextField, Avatar, Box, IconButton, } from '@mui/material';

const AvatarEditor = ({ avatar, preview, isEditing, onEdit, onChange, onSave, onCancel }) => (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
        <Box sx={{ position: "relative", width: 125, height: 125 }}>
            <Avatar alt="profile picture" src={preview} sx={{ width: 125, height: 125 }}>
            </Avatar>
            {!isEditing && (
                <IconButton
                    onClick={onEdit}
                    sx={{
                        position: "absolute", bottom: 0, right: 0, backgroundColor: "white",
                        border: "1px solid #ccc", p: 0.5, "&:hover": { backgroundColor: "grey.100" }
                    }}
                >
                    <EditRoundedIcon fontSize="small" />
                </IconButton>
            )}
        </Box>
        {isEditing && (
            <Box sx={{ mt: 1, width: "100%" }}>
                <TextField
                    value={avatar}
                    onChange={(e) => onChange(e.target.value)}
                    size="small"
                    placeholder="Ny avatar-URL"
                    fullWidth
                />
                <Box sx={{ display: "flex", justifyContent: "center", mt: 1, gap: 1 }}>
                    <IconButton onClick={onSave} size="small">
                        <CheckIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={onCancel} size="small">
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
        )}
    </Box>
);

export default AvatarEditor;