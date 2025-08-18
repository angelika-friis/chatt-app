import { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../api/authService";
import { Avatar, Box, TextField, Alert } from "@mui/material";
import isUrlValid from "../utils/isUrlValid";
import { LinkButton, SubmitButton } from "../components/Buttons";

const Register = () => {
    const [form, setForm] = useState({ username: "", password: "", email: "", avatar: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fields = [
        { name: "email", type: "email", placeholder: "Mejl" },
        { name: "username", type: "text", placeholder: "Användarnamn" },
        { name: "password", type: "password", placeholder: "Lösenord" },
        { name: "avatar", type: "url", placeholder: "Url för profilbild" },
    ];

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const res = await registerUser(form);
        if (!res.success) {
            setError(res.message);
        } else {
            setError("");
            navigate(`/login?registrationSuccessful=${form.username}`);
        }
    }

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateRows: '84.5px 48.0167px auto auto',
            height: '100vh',
            alignItems: 'start',
            justifyItems: 'center',
        }}>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", p: 3, }}>
                <Box
                    component="img"
                    src="logo.png"
                    alt="Logo"
                    sx={{
                        width: '100px',
                    }}
                />
                <LinkButton to="/login">Redan registrerad?</LinkButton>
            </Box>
            {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}
            <Box
                component="form"
                onSubmit={handleRegister}
                sx={{ display: 'flex', flexDirection: { md: 'row', xs: 'column' }, alignItems: 'center', justifyContent: 'space-around', gap: 2, width: "50%" }}
                gridRow={4}
            >

                <Avatar
                    src={isUrlValid(form.avatar) ? form.avatar : undefined}
                    alt="Förhandsvisning av profilbild"
                    sx={{ width: 150, height: 150, m: 5 }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: { xs: 2, md: 4 } }}>
                    {fields.map(field => (
                        <TextField
                            key={field.name}
                            {...field}
                            value={form[field.name]}
                            onChange={handleChange}
                            size="small"
                            sx={{ width: "100%" }}
                        />
                    ))}
                    <SubmitButton>
                        Registrera
                    </SubmitButton>

                </Box>


            </Box>

        </Box>
    )
}
export default Register;