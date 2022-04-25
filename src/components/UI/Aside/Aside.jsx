import { Link } from "react-router-dom";
import "./Aside.css";
import { bxIcons } from "../../../data/icons";
import {
	IcOutlineBookmarks,
	IcOutlineExplore,
	PhHeartDuotone,
} from "../../../data/Icon";

export const Aside = () => {
	return (
		<aside className="nav notes_nav">
			<ul className="nav__items">
				<Link to="/" className="nav__list_item">
					{bxIcons.home}
					<span className="nav__item">Home</span>
				</Link>

				<Link to="/explore" className="nav__list_item">
					<IcOutlineExplore />
					<span className="nav__item">Explore</span>
				</Link>

				<Link to="/playlist" className="nav__list_item">
					{bxIcons.playlist}
					<span className="nav__item">Playlist</span>
				</Link>

				<Link to="/like" className="nav__list_item">
					<PhHeartDuotone />
					<span className="nav__item">Liked Video</span>
				</Link>
				<Link to="/watchlater" className="nav__list_item">
					<IcOutlineBookmarks />
					<span className="nav__item">Watch Later</span>
				</Link>
				<Link to="/profile" className="nav__list_item">
					{bxIcons.userCircle}
					<span className="nav__item">Profile</span>
				</Link>
			</ul>
		</aside>
	);
};
