import { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../api/authService";

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
            navigate("/login");
            alert("registrerad!")
        }
    }

    return (
        <div>
            <input
                type="email"
                name="email"
                placeholder="Mejl"
                value={form.email}
                onChange={handleChange}
            />
            <input
                type="text"
                name="username"
                placeholder="Användarnamn"
                value={form.username}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Lösenord"
                value={form.password}
                onChange={handleChange}
            />
            <input
                type="url"
                name="avatar"
                placeholder="url för profilbild"
                value={form.avatar}
                onChange={handleChange}
            />

            {isUrlValid(form.avatar) && (
                <img
                    src={form.avatar}
                    alt="Förhandsvisning profilbild"
                />
            )}

            <p>{error}</p>

            <button
                onClick={handleRegister}
                disabled={!form.username || !form.email || !form.password}
            >
                Registrera
            </button>
        </div>
    )
}
export default Register