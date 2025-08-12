import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

export default function HeaderBar({ showBackButton, onBackClick, onMenuClick }) {
    return (
        <AppBar position="static">
            <Toolbar>
                {showBackButton && (
                    <IconButton
                        color="inherit"
                        onClick={onBackClick}
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
                    onClick={onMenuClick}
                >
                    <MenuRoundedIcon />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
