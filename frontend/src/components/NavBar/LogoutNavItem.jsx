import { useNavigate } from "react-router-dom";

// Component handles the logout functionality in the navigation bar
export default function LogoutNavItem() {
    const navigate = useNavigate();

    const handleClick = () => {
        // Displays a confirmation dialog confirming the user wants to log out
        const confirmed = window.confirm("Are you sure you want to log out?");

        // If the user confirms the logout, clear the localStorage and navigate to the login page
        if (confirmed) {
            localStorage.clear();
            navigate("/login");
        }
    };

    return (
        <button type="button" id="logout-nav-button" onClick={handleClick}>
            Log out
        </button>
    );
}
