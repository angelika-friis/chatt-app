import { AppBar, Toolbar, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MenuIcon from '@mui/icons-material/Menu';

export default function HeaderBar({ showBackButton, onBackClick, onMenuClick }) {
    return (
        <AppBar position="fixed" sx={{
            backgroundColor: "transparent",
            backdropFilter: "blur(10px)",
            color: "black",
            boxShadow: "none",
            top: 0,
            zIndex: 1200
        }}>
            <Toolbar
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%"
                }}
            >
                {showBackButton && (
                    <IconButton
                        color="inherit"
                        onClick={onBackClick}
                        aria-label="go back"
                    >
                        <ArrowBackIosNewIcon />
                    </IconButton>
                )}

                <IconButton
                    aria-label="open menu"
                    sx={{
                        cursor: "pointer",
                        color: "black",
                        ml: "auto",
                        ":hover": {
                            backgroundColor: "transparent"
                        }
                    }}
                    onClick={onMenuClick}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar >
    );
}
