import { Link } from "react-router-dom";
import "./Aside.css";
import { bxIcons } from "../../../data/icons";

export const AsideMobile = () => {
	return (
		<aside className="nav--mobile">
			<ul className="nav__items--mobile ">
				<Link to="/home" className="nav__list_item">
					{bxIcons.home}
				</Link>

				<Link to="/label" className="nav__list_item">
					{bxIcons.label}
				</Link>

				<Link to="/archive" className="nav__list_item">
					{bxIcons.archive}
				</Link>

				<Link to="/trash" className="nav__list_item">
					{bxIcons.trash}
				</Link>
				<Link to="/profile" className="nav__list_item">
					{bxIcons.userCircle}
				</Link>
			</ul>
		</aside>
	);
};
