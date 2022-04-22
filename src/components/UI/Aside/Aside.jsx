import { Link } from "react-router-dom";
import "./Aside.css";
import { bxIcons } from "../../../data/icons";

export const Aside = () => {
	return (
		<aside className="nav notes_nav">
			<ul className="nav__items">
				<Link to="/home" className="nav__list_item">
					{bxIcons.home}
					<span className="nav__item">Home</span>
				</Link>

				<Link to="/label" className="nav__list_item">
					{bxIcons.label}
					<span className="nav__item">Labels</span>
				</Link>

				<Link to="/archive" className="nav__list_item">
					{bxIcons.archive}
					<span className="nav__item">Archive</span>
				</Link>

				<Link to="/trash" className="nav__list_item">
					{bxIcons.trash}
					<span className="nav__item">Trash</span>
				</Link>
				<Link to="/profile" className="nav__list_item">
					{bxIcons.userCircle}
					<span className="nav__item">Profile</span>
				</Link>
			</ul>
		</aside>
	);
};
