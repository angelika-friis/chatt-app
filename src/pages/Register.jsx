import { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../api/authService";
import { Avatar, Button, TextField } from "@mui/material";

const Register = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
        email: "",
        avatar: "",
    })
    const [error, setError] = useState("");

    let navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const isUrlValid = (url) => {
        try {
            return Boolean(new URL(url))
        } catch {
            return false
        }
    }

    const handleRegister = async (e) => {
        const res = await registerUser(form);
        if (!res.success) {
            console.log(res.message);
            setError(res.message);
        } else {
            setError("");
            navigate(`/login?registrationSucessful=${form.username}`);
            alert("registrerad!")
        }
    }

    return (
        <div>
            <TextField
                type="email"
                name="email"
                placeholder="Mejl"
                value={form.email}
                onChange={handleChange}
            />
            <TextField
                type="text"
                name="username"
                placeholder="Användarnamn"
                value={form.username}
                onChange={handleChange}
            />
            <TextField
                type="password"
                name="password"
                placeholder="Lösenord"
                value={form.password}
                onChange={handleChange}
            />
            <TextField
                type="url"
                name="avatar"
                placeholder="url för profilbild"
                value={form.avatar}
                onChange={handleChange}
            />

            {isUrlValid(form.avatar) ? (
                <Avatar
                    src={form.avatar}
                    alt="Förhandsvisning av profilbild"
                    sx={{ width: 100, height: 100 }}
                >
                </Avatar>
            ) :
                (<>
                    <Avatar
                        alt="Förhandsvisning av profilbild"
                        sx={{ width: 100, height: 100 }}
                    >
                    </Avatar>
                </>)
            }

            <p>{error}</p>

            <Button
                onClick={handleRegister}
                disabled={!form.username || !form.email || !form.password}
                variant="contained"
                size="large"
                sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    textTransform: "none",
                }}

            >
                Registrera
            </Button>
        </div>
    )
}
export default Register