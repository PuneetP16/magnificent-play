import { bxIcons } from "../../../../data/icons";
import { useLocation } from "react-router-dom";
import "./SearchBox.css";

export const SearchBoxMobile = () => {
	const { pathname } = useLocation();
	const visibility = (() =>
		pathname === "/login" || pathname === "/signup" || pathname === "/"
			? "invisible"
			: "")();

	return (
		<form className={`${visibility} search_on_mobile`} method="get">
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
