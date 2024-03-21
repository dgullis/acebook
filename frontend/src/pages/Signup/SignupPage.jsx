import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authentication";
import Navbar from "../../components/NavBar/navbar";
import "./SignupPage.css";

export const SignupPage = () => {
    const [username, setUsername] = useState(""); // State for storing username input
    const [email, setEmail] = useState(""); // State for storing email input
    const [password, setPassword] = useState(""); // State for storing password input
    const [notice, setNotice] = useState(""); // State for displaying signup notices
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signup(username, email, password); // Attempt to sign up with provided credentials
            setNotice("Signup sucessfull") // Set notice for successful signup
            navigate("/login"); // Redirect to login page after successful signup
        } catch (err) {
            setNotice(err.message); // Set notice for failed signup attempt
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);  // Update username state with input value
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

        <div className="signup-page-container">
            <div className="signup-page" style={password ? { } : {paddingBottom: "100px"}}>

            <div className="homepage-logo">
                aceBook
            </div>
            
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="signup-username-input">
                    <label htmlFor="username"></label>
                    <input
                        id="username"
                        placeholder="Username"
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>

                <div className="signup-email-input">
                    <label htmlFor="email"></label>
                    <input
                        id="email"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>

                <div className="signup-password-input">
                    <label htmlFor="password"></label>
                    <input
                        placeholder="Password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="signup-button-container">
                    <input
                        role="submit-button"
                        id="submit"
                        type="submit"
                        value="Sign up"
                    />
                </div>

                {password && 
                <div className="password-requirements">
                    Password must contain: <br /><br/>
                    <li>8 to 30 characters</li>
                    <li>Upper and lower case characters</li>
                    <li>A number</li>
                    <li>A special character</li>
                </div>
}
                <div className="signup-notice">
                        {notice && notice}
                    </div>
            </form>
            </div>
        </div>
    </>
    );
};
