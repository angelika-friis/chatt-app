import { useState } from "react";
import { login } from "../api/authService";
import { useNavigate } from "react-router";
import { Alert, TextField } from "@mui/material";
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
    const registeredUser = searchParams.get("registrationSucessful");

    const fields = [
        { name: "username", type: "text", placeholder: "Användarnamn" },
        { name: "password", type: "password", placeholder: "Lösenord" },
    ];

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
            <LinkButton to="/register">Inte registrerad?</LinkButton>

            {registeredUser &&
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                    Lyckad registrering. Välkommen {registeredUser}! 👋
                </Alert>}

            <img src="logo.svg" />

            <div>

                {fields.map(field => (
                    <TextField
                        key={field.name}
                        {...field}
                        value={form[field.name]}
                        onChange={handleChange} />
                ))}

                <p>{error}</p>

                <SubmitButton
                    onClick={handleLogin}
                    disabled={!form.username || !form.password}
                >
                    Logga in
                </SubmitButton>
            </div>
        </>
    )
}
export default Login