import { useNavigate } from "react-router-dom";

export default function LogoutNavItem() {
    const navigate = useNavigate();

    const handleClick = () => {
        const confirmed = window.confirm("Are you sure you want to log out?");

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
