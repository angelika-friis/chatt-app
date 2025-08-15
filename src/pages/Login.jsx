import { useState } from "react";
import { login } from "../api/authService";
import { useNavigate } from "react-router";
import { Alert, Box, TextField, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import { jwtDecode } from "jwt-decode";
import { LinkButton, SubmitButton } from "../components/Buttons";

const Login = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    })
    const [error, setError] = useState("");
    let [searchParams, setSearchParams] = useSearchParams();
    let navigate = useNavigate();
    const registeredUser = searchParams.get("registrationSuccessful");

    const fields = [
        { name: "username", type: "text", placeholder: "Användarnamn" },
        { name: "password", type: "password", placeholder: "Lösenord" },
    ];

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await login(form);
        if (!res.success) {
            console.log(res.message);
            setError(res.message);
        } else {
            setError("");
            const jwtToken = res.data.token;
            localStorage.setItem("jwtToken", jwtToken);
            const decodedToken = jwtDecode(jwtToken);
            localStorage.setItem("userData", JSON.stringify(decodedToken));
            navigate("/chats");
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
                gap: 2
            }}
        >
            {registeredUser && (
                <Alert
                    icon={<CheckIcon fontSize="inherit" />}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    Lyckad registrering. Välkommen {registeredUser}! 👋
                </Alert>
            )}

            <LinkButton to="/register" m={3} mr={5}>
                Inte registrerad?
            </LinkButton>

            <Box
                component="img"
                src="logo.png"
                alt="Logo"
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    height: 'auto',
                    p: 5,
                    alignSelf: 'end'
                }}
            />

            <Box
                component="form"
                onSubmit={handleLogin}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '50%',
                    mb: 8
                }}
            >
                {fields.map(field => (
                    <TextField
                        key={field.name}
                        {...field}
                        value={form[field.name]}
                        onChange={handleChange}
                        size="small"
                    />
                ))}

                <SubmitButton>Logga in</SubmitButton>

                <Typography variant="body2" sx={{ alignSelf: 'center' }}>{error}</Typography>
            </Box>
        </Box>

    )
}
export default Login