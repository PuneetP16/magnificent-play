import { bxIcons } from "../../../../data/icons";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchBox.css";
import { useState, useEffect } from "react";
import { filterAction } from "../../../../store/filterSlice";
import { useDispatch } from "react-redux";

export const SearchBox = () => {
	const { pathname } = useLocation();
	const visibility = (() =>
		pathname === "/login" || pathname === "/signup" ? "invisible" : "")();
	const dispatch = useDispatch();

	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const onChangeSearchHandler = (e) => {
		setQuery(e.target.value);
	};

	useEffect(() => {
		if (query) {
			dispatch(filterAction.filterBySearch(query));
		} else {
			dispatch(filterAction.reset());
		}
	}, [dispatch, query]);

	const passQuery = (e) => {
		e.preventDefault();
		if (query) {
			navigate(`/explore/search?query=${query}`);
			setQuery("");
		} else {
			navigate("/explore");
			setQuery("");
		}
	};
	return (
		<form
			onSubmit={passQuery}
			className={`search_box ${visibility} search_on_header`}
			method="get"
		>
			<input
				type="search"
				className="input_box"
				placeholder="Search for items"
				value={query}
				onChange={onChangeSearchHandler}
				required
			/>

			<button
				type="submit"
				onClick={passQuery}
				className="btn btn--primary btn--icon"
			>
				{bxIcons.searchAlt2}
			</button>
		</form>
	);
};
