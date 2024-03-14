import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authentication";
import Navbar from "../../components/NavBar/navbar";
import "./SignupPage.css";

export const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notice, setNotice] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signup(username, email, password);
            setNotice("Signup sucessfull")
            navigate("/login");
        } catch (err) {
            setNotice(err.message);
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
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

        <div className="signup-page-container">
            <div className="signup-page" style={password ? { } : {paddingBottom: "100px"}}>

            <div className="homepage-logo">
                aceBook
            </div>
            
            <form onSubmit={handleSubmit}>
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
                        value="Sign Up"
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
