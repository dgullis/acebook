import { useNavigate } from "react-router-dom";

// Component renders button linking to login page ("/login")
export default function LoginNavItem() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/login")
    }

    return (
        <button
        type="button"
        id="login-nav-button"
        onClick={handleClick}
        >
            Log in
        </button>
    )

}