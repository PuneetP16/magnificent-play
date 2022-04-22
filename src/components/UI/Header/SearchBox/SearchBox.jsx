import { bxIcons } from "../../../../data/icons";
import { useLocation } from "react-router-dom";
import "./SearchBox.css";

export const SearchBox = () => {
	const { pathname } = useLocation();
	const visibility = (() =>
		pathname === "/login" || pathname === "/signup" ? "invisible" : "")();

	return (
		<form className={`search_box ${visibility} search_on_header`} method="get">
			<input
				type="search"
				className="input_box"
				placeholder="Search for items"
				required
			/>

			<button type="submit" className="btn btn--primary btn--icon">
				{bxIcons.searchAlt2}
			</button>
		</form>
	);
};
