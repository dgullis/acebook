import { useNavigate } from "react-router-dom";

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