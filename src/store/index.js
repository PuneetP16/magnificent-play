import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { filterSlice } from "./filterSlice";
import { userSlice } from "./userSlice";
import { videosSlice } from "./videoSlice";

export const store = configureStore({
	reducer: {
		videos: videosSlice.reducer,
		filter: filterSlice.reducer,
		auth: authSlice.reducer,
		user: userSlice.reducer,
	},
});
