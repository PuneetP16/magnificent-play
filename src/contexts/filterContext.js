import { useContext, createContext, useReducer, useEffect } from "react";

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

const filterReducer = ({ byLatest, category, search }, { type, payload }) => {
	switch (type) {
		case "SORT_BY_DATE":
			byLatest = payload;
			return {
				byLatest,
				category,
				search,
			};

		case "CATEGORY":
			category = payload;
			if (category === "All") {
				search=""
			}
			return {
				byLatest,
				category,
				search,
			};

		case "SEARCH":
			search = payload;
			return {
				byLatest,
				category,
				search,
			};

		case "RESET":
			return { ...payload };

		default:
			return {
				byLatest,
				category,
				search,
			};
	}
};

export const FilterProvider = ({ children }) => {
	const initialFilterState = {
		category: "All",
		byLatest: "unsort",
		search: "",
	};

	const [filterState, filterDispatch] = useReducer(
		filterReducer,
		initialFilterState
	);

	const { byLatest, category, search } = filterState;

	const value = {
		filterDispatch,
		byLatest,
		category,
		initialFilterState,
		search,
	};

	useEffect(() => {
		filterDispatch({
			type: "SORT_BY_DATE",
			payload: byLatest,
		});
	}, [filterDispatch, byLatest]);

	return (
		<FilterContext.Provider value={value}>{children}</FilterContext.Provider>
	);
};
