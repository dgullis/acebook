import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authentication";
import Navbar from "../../components/NavBar/navbar";
import "./LoginPage.css";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notice, setNotice] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!email || !password) {
            setNotice("Email or password not entered")
        } else {
            try {
                const data = await login(email, password);
                window.localStorage.setItem("token", data.token);
                window.localStorage.setItem("user", JSON.stringify(data.user));
                setNotice("Login successfull")
                navigate("/posts");
            } catch (err) {
                console.error(err);
                setNotice(err.message);
            }
        }

    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
    <>
        <Navbar />
        <div className="login-page-container">
            <div className="login-page">
                <form onSubmit={handleSubmit}>
                    <div className="email-input">
                        <label htmlFor="email"></label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="password-input">
                        <label htmlFor="password"></label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="login-button-container">
                        <input
                            role="submit-button"
                            id="submit"
                            type="submit"
                            value="login"
                        />
                    </div>
                    <div className="login-notice">
                        {notice && notice}
                    </div>
                </form>
            </div>
        </div>
    </>
    );
};
