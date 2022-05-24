import { Link } from "react-router-dom";
import "./Aside.css";
import { bxIcons } from "../../../data/icons";
import {
	IcOutlineBookmarks,
	IcOutlineExplore,
	PhHeartDuotone,
} from "../../../data/Icon";
import { useSelector } from "react-redux";

export const AsideMobile = () => {
	const { isAuth } = useSelector((state) => state.auth);

	return (
		<aside className="nav--mobile">
			<ul className="nav__items--mobile ">
				<Link to="/" className="nav__list_item">
					{bxIcons.home}
				</Link>

				<Link to="/explore" className="nav__list_item">
					<IcOutlineExplore />
				</Link>

				{isAuth && (
					<>
						<Link to="/playlist" className="nav__list_item">
							{bxIcons.playlist}
						</Link>

						<Link to="/like" className="nav__list_item">
							<PhHeartDuotone />
						</Link>
						<Link to="/watchlater" className="nav__list_item">
							<IcOutlineBookmarks />
						</Link>
						<Link to="/history" className="nav__list_item">
							{bxIcons.history}
						</Link>
						<Link to="/profile" className="nav__list_item">
							{bxIcons.userCircle}
						</Link>
					</>
				)}
			</ul>
		</aside>
	);
};
