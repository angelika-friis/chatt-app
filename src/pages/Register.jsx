import { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../api/authService";
import { Avatar, TextField } from "@mui/material";
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

    const handleRegister = async () => {
        const res = await registerUser(form);
        if (!res.success) {
            setError(res.message);
        } else {
            setError("");
            navigate(`/login?registrationSucessful=${form.username}`);
        }
    }

    return (
        <div>
            <LinkButton to="/login">Redan registrerad?</LinkButton>

            {fields.map(field => (
                <TextField
                    key={field.name}
                    {...field}
                    value={form[field.name]}
                    onChange={handleChange} />
            ))}

            <Avatar
                src={isUrlValid(form.avatar) ? form.avatar : undefined}
                alt="Förhandsvisning av profilbild"
                sx={{ width: 100, height: 100 }}
            />

            <p>{error}</p>

            <SubmitButton
                onClick={handleRegister}
                disabled={!form.username || !form.email || !form.password}
            >
                Registrera
            </SubmitButton>
        </div>
    )
}
export default Register;