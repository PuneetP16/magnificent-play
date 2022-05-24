import { createSlice } from "@reduxjs/toolkit";

const initialFilterState = {
	category: "All",
	byLatest: "unsort",
	search: "",
};

export const filterSlice = createSlice({
	name: "filter",
	initialState: initialFilterState,
	reducers: {
		sortByDate(state, action) {
			state.byLatest = action.payload;
		},

		filterByCategory(state, action) {
			state.category = action.payload;
			if (action.payload === "All") {
				state.search = "";
			}
		},

		filterBySearch(state, action) {
			state.search = action.payload;
		},

		reset(state) {
			state = initialFilterState;
		},
	},
});

export const filterAction = filterSlice.actions;

