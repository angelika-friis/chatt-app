import { Box, IconButton, Typography } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <Box sx={{ textAlign: "center", p: 2, backgroundColor: "lightgray", position: "fixed", bottom: 0, width: "100%" }}>
            <IconButton size="small"><GitHubIcon /></IconButton>
            <Typography variant="body2">Angelika Friis 2025</Typography>
        </Box>
    )
}
export default Footer;