import { createSlice } from "@reduxjs/toolkit";

const localUserData = JSON.parse(localStorage.getItem("VideoLibUser"));
const initialFormState = localUserData ?? {
	loginData: {
		email: "adarshbalika@gmail.com",
		password: "adarshBalika123",
	},
	userData: {},
};

export const userSlice = createSlice({
	name: "user",
	initialState: initialFormState,
	reducers: {
		userInputHandler(state, action) {
			state.loginData = {
				...state.loginData,
				[action.payload.field]: action.payload.value,
			};
		},
		submitHandler(state, action) {
			let data = {
				loginData: {
					email: "adarshbalika@gmail.com",
					password: "adarshBalika123",
				},
				userData: { ...state.userData, ...action.payload.userData },
			};
			localStorage.removeItem("VideoLibUser");
			localStorage.setItem("VideoLibUser", JSON.stringify(data));
			let defaultData = initialFormState.loginData;
			state.loginData =
				action?.payload?.initialFormState?.loginData ?? defaultData;
			state.userData = action.payload.userData;
		},
	},
});

export const userAction = userSlice.actions;
