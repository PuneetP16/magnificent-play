import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem("videoToken");
export const authSlice = createSlice({
	name: "auth",
	initialState: { isAuth: token ? true : false, token },
	reducers: {
		toggleAuth(state) {
			state.isAuth = !state.isAuth;
		},

		setIsAuth(state, action) {
			state.isAuth = action.payload;
		},

		setToken(state, action) {
			state.token = action.payload;
		},
	},
});

export const authAction = authSlice.actions;
