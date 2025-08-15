import { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../api/authService";
import { Avatar, Box, TextField } from "@mui/material";
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
        if (e.target.name === "avatar" && !isUrlValid(e.target.value)) {
            setError("Ogiltig URL för profilbild");
        }
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

            <Box
                component="form"
                onSubmit={handleRegister}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: "50%" }}
            >
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

                <Avatar
                    src={isUrlValid(form.avatar) ? form.avatar : undefined}
                    alt="Förhandsvisning av profilbild"
                    sx={{ width: 150, height: 150, m: 5 }}
                />

                <SubmitButton
                >
                    Registrera
                </SubmitButton>

                <p>{error}</p>

            </Box>
        </Box>
    )
}
export default Register;