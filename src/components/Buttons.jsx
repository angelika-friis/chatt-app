import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const LinkButton = ({ to, children, ...props }) => (
    <Button
        component={Link}
        to={to}
        variant="outlined"
        color="secondary"
        size="large"
        sx={{
            textTransform: "none",
        }}
        {...props}
    >
        {children}
    </Button>
);

export const SubmitButton = ({ onClick, disabled, children, ...props }) => (
    <Button
        variant="contained"
        size="large"
        sx={{
            textTransform: "none",
        }}
        onClick={onClick}
        disabled={disabled}
        {...props}
    >
        {children}
    </Button>
);