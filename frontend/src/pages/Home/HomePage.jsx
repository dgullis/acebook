import { Link } from "react-router-dom";
import "./HomePage.css";
import Navbar from "../../components/NavBar/navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AboutModal from "../../components/AboutModal/AboutModal";

export const HomePage = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            // console.log(token)
            navigate("/posts");
        }
    }, [token, navigate]);

    return (
        <>
            <Navbar />
            <div className="homepage-container">
                <div className="homepage-options">
                    <div className="homepage-logo">
                        aceBook
                    </div>
                    <div className="homepage-signup-button-container">
                        <a href="/signup">
                            <button id="sign-up-button" type="button">
                                Sign up
                            </button>
                        </a>
                    </div>
                    <div className="homepage-login-button-container">
                        <a href="/login">
                            <button id="log-in-button" type="button">
                                Log in
                            </button>
                        </a>
                    </div>

                    <AboutModal />

                    <div className="homepage-about">
                        aceBook is a project completed on the Makers Academy software development bootcamp. <br /> <br /> 
                        Please click on About for more information
                    </div>

                </div>
            </div>
        </>
    );
};
