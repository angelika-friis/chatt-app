import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { TextField, ListItemText, ListItem, IconButton } from '@mui/material';

const EditableField = ({ label, value, isEditing, onEdit, onChange, onSave, onCancel }) => (
    <ListItem
        secondaryAction={
            isEditing ? (
                <>
                    <IconButton onClick={onSave}><CheckIcon /></IconButton>
                    <IconButton onClick={onCancel}><CloseIcon /></IconButton>
                </>
            ) : (
                <IconButton onClick={onEdit}><EditRoundedIcon /></IconButton>
            )
        }
    >
        {isEditing ? (
            <TextField value={value} onChange={(e) => onChange(e.target.value)} size="small" fullWidth />
        ) : (
            <ListItemText primary={label} />
        )}
    </ListItem>
);

export default EditableField;