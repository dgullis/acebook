import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authentication";
import Navbar from "../../components/NavBar/navbar";
import "./LoginPage.css";

export const LoginPage = () => {
    const [email, setEmail] = useState(""); // State for storing email input
    const [password, setPassword] = useState(""); // State for storing email input
    const [notice, setNotice] = useState("") // State for displaying login notices

    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!email || !password) { // Check if email or password is empty
            setNotice("Email or password not entered") // Set notice if email or password is empty
        } else {
            try {
                const data = await login(email, password); // Attempt to log in with provided credentials
                window.localStorage.setItem("token", data.token); // Store token in local storage
                window.localStorage.setItem("user", JSON.stringify(data.user)); // Store user data in local storage
                setNotice("Login successfull") // Set notice for successful login
                navigate("/posts"); // Redirect to posts page after successful login
            } catch (err) {
                console.error(err); // Log error to console if login unsuccessfull
                setNotice(err.message); // Set notice for failed login attempt
            }
        }

    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value); // Update email state with input value
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value); // Update password state with input value
    };

    return (
    <>
        <Navbar />
        <div className="login-page-container">
            <div className="login-page">
            <div className="homepage-logo">
                        aceBook
                    </div>
                <form autoComplete="off" onSubmit={handleSubmit}>
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
                            value="Log in"
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
