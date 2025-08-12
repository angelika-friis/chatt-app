import {
    TextField,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    IconButton
} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CustomDialog from "./CustomDialog";

export default function UserSearchDialog({
    open,
    onClose,
    query,
    onQueryChange,
    searchResult,
    onAddContact
}) {
    return (
        <CustomDialog open={open} onClose={onClose} title="Sök efter användare">
            <TextField
                fullWidth
                autoFocus
                margin="dense"
                variant="outlined"
                label="Användarnamn"
                value={query}
                onChange={onQueryChange}
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
                                    onClick={(e) => onAddContact(e, user)}
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
        </CustomDialog>
    );
}
