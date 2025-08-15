import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const LinkButton = ({ to, children, ...props }) => (
    <Button
        type="submit"
        component={Link}
        to={to}
        variant="outlined"
        color="secondary"
        sx={{
            textTransform: "none",
            alignSelf: 'end',
            justifySelf: 'flex-start',
            borderRadius: '20px',
            "&:hover": {
                color: "rgba(144, 49, 170)",
            },
            ...props
        }}
    >
        {children}
    </Button >
);

export const SubmitButton = ({ onClick, disabled, children, ...props }) => (
    <Button
        variant="contained"
        type="submit"
        sx={{
            textTransform: "none",
            backgroundColor: "#000",
            height: "40px",
            boxShadow: "none",
            width: "100%",
        }}

        onClick={onClick}
        disabled={disabled}
        {...props}
    >
        {children}
    </Button>
);