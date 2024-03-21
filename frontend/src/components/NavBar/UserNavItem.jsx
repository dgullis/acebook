import "./navbar.css";

import { Link } from "react-router-dom";

// Component renders image of logged in user as clickable link to their profile
export default function UserNavItem({ user }) {

	return (
		<div className="navbar-user-image">
			<Link to={`/users/${user.username}`}>
				<img src={user.image} className="navbar-user-image"></img>
				<p className="navbar-user-username">{user.username}</p>
			</Link>
		</div>
	);
}
