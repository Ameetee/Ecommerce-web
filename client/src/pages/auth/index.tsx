import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { UserErrors } from "../../../src/errors";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
    return (
        <div className="auth">
            <Register />
            <Login />

        </div>
    );
};
const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/user/register", {
                username,
                password,
            });
            alert("Registration completed! Now login.");
        } catch (err) {
            if (err?.response?.data?.type === UserErrors.NO_USER_FOUND) {
                alert("ERROR: Username already in use.");
            } else {
                alert("ERROR: Something went wrong.")
            }
        }
    };
    return (
        <div className="auth-container">
            <form>
                <h2> Register</h2>
                <div className="form-group">
                    <label htmlFor="username"> Username: </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password"> Password: </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit"> Register</button>
            </form>
        </div>
    );
};


const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate()

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            const result = await axios.post("http://localhost:3001/user/login", {
                username,
                password,
            });
            setCookies("access_token", result.data.token);
            localStorage.setItem("userID", result.data.userID);
            navigate("/");
        } catch (err) {
            let errorMessage: string = "";
            switch (err.response.data.type) {
                case UserErrors.NO_USER_FOUND:
                    errorMessage = "User doesn't exist";
                    break;
                case UserErrors.WRONG_CREDENTIALS:
                    errorMessage = "wrong username/password combination";
                    break;
                default:
                    errorMessage = "Something went wrong";
            }
            alert("ERROR: " + errorMessage);

            if (err?.response?.data?.type === UserErrors.NO_USER_FOUND) {
                alert("ERROR: Username already in use.");
            } else {
                alert("ERROR: Something went wrong.");
            }
        }
    }
    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2> Login</h2>
                <div className="form-group">
                    <label htmlFor="username"> Username: </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password"> password: </label>
                    <input
                        type="text"
                        id="username"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
            </form>
        </div>
    )
}
