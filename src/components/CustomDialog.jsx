import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function CustomDialog({
    open,
    onClose,
    title,
    maxWidth = "sm",
    fullWidth = true,
    children
}) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth={fullWidth} maxWidth={maxWidth}>
            <DialogTitle sx={{ m: 0, p: 2 }}>
                {title}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
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
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
}
