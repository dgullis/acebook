import { useNavigate } from "react-router-dom";

// Component renders button linking to signup page ("/signup")
export default function LogoutNavItem() {
    const navigate = useNavigate();

    // Clears local storage and navigates to signup page
    const handleClick = () => {
        localStorage.clear();
        navigate("/signup")
    }

    return (
        <button
        type="button"
        id="signup-nav-button"
        onClick={handleClick}
        >
            Sign up
        </button>
    )

}