import axios from "axios";
import { Toast } from "../../components";
import { authAction } from "../../store/authSlice";
import { userAction } from "../../store/userSlice";

export const signIn = async ({ loginData, toggleLoader, theme, dispatch }) => {
	try {
		toggleLoader();
		const res = await axios.post("/api/auth/login", loginData);
		if (res.status === 200) {
			Toast("success", "Logged in Successfully", theme);
			localStorage.setItem("videoToken", res.data.encodedToken);
			setTimeout(() => {
				dispatch(authAction.toggleAuth());
				dispatch(authAction.setToken(res.data.encodedToken));
			}, 1000);

			const currentUserData = {
				loginData: { ...loginData },

				userData: {
					[res.data.foundUser.email]: {
						firstName: res.data.foundUser.firstName,
						lastName: res.data.foundUser.lastName,
						email: res.data.foundUser.email,
					},
				},
			};

			dispatch(userAction.submitHandler(currentUserData));

			toggleLoader();
		}

		if (res.status === 201) {
			Toast("error", "Invalid Password, Try Again", theme);

			toggleLoader();
			return;
		}
	} catch (error) {
		toggleLoader();
		const errorText = error.response.data.errors[0];

		Toast("error", errorText, theme);
	}
};
