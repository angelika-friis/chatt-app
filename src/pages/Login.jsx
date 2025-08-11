import { useState } from "react";
import { login } from "../api/authService";
import { Link, useNavigate } from "react-router";
import { Alert, Button, TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    })
    const [error, setError] = useState("");
    let [searchParams, setSearchParams] = useSearchParams();

    let navigate = useNavigate();

    const registeredUser = searchParams.get("registrationSucessful");

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
            localStorage.setItem("jwtToken", jwtToken);
            const decodedToken = jwtDecode(jwtToken);
            localStorage.setItem("userData", JSON.stringify(decodedToken));
            navigate("/chats");
        }
    }

    return (
        <>
            <Link to={`/register`}>
                <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    sx={{
                        textTransform: "none",
                    }}
                >
                    Inte registrerarad?
                </Button>
            </Link>
            {registeredUser &&
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                    Lyckad registrering. Välkommen {registeredUser}! 👋
                </Alert>}
            <img src="logo.svg" />
            <div>
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
                <p>{error}</p>

                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        backgroundColor: "#000",
                        color: "#fff",
                        textTransform: "none",
                        "&:hover": {
                            backgroundColor: "rgba(144, 49, 170)",
                        },
                    }}
                    onClick={handleLogin}
                    disabled={!form.username || !form.password}
                >
                    Logga in
                </Button>
            </div>
        </>
    )
}
export default Login