import { useNavigate } from "react-router-dom";

// Component render button linking to homepage ("/")
export default function HomeNavItem() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
    }

    return (
        <button
        type="button"
        id="home-nav-button"
        onClick={handleClick}
        >
            Home
        </button>


    )

}