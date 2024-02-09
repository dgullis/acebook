import "./navbar.css";

import { Link } from "react-router-dom";

export default function UserNavItem({ user }) {

	console.log("user image trigger", user.image)
	return (
		<div className="navbar-user-image">
			<Link to={`/users/${user.username}`}>
				<img src={user.image} className="navbar-user-image"></img>
				<p className="navbar-user-username">{user.username}</p>
			</Link>
		</div>
	);
}
