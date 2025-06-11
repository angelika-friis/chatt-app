import { useState } from "react";
import { login } from "../api/authService";
import { useNavigate } from "react-router";

const Login = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    })
    const [error, setError] = useState("");

    let navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        const res = await login(form);
        if (!res.success) {
            console.log(res.message);
            setError(res.message);
        } else {
            setError("");
            const jwtToken = res.data.token;
            localStorage.setItem("jwtToken", jwtToken)
            alert("inloggad!")
            navigate("/chats");
        }
    }

    return (
        <div>
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
            <p>{error}</p>
            <button
                onClick={handleLogin}
                disabled={!form.username || !form.password}
            >
                Logga in
            </button>
        </div>
    )
}
export default Login