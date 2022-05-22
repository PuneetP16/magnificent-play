import axios from "axios";
import { Toast } from "../../components";

export const signIn = async ({
	loginData,
	dispatch,
	initialFormState,
	toggleAuth,
	rememberMe,
	toggleLoader,
	theme,
}) => {
	try {
		toggleLoader();

		const res = await axios.post("/api/auth/login", loginData);
		if (res.status === 200) {
			Toast("success", "Logged in Successfully", theme);

			localStorage.setItem("videoToken", res.data.encodedToken);
			setTimeout(() => {
				toggleAuth();
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

			dispatch({
				type: "HANDLE_SUBMIT",
				initialFormState: rememberMe
					? { loginData: { ...loginData } }
					: initialFormState,
				payload: currentUserData,
			});
			toggleLoader();
		}

		if (res.status === 201) {
			Toast("error", "Invalid Password, Try Again", theme);

			toggleLoader();
			return;
		}
	} catch (error) {
		console.log(error, "Invalid Credentials");
		let msg = JSON.stringify(error);

		let parsedMsg = JSON.parse(msg);
		const alertText =
			parsedMsg.status === 404
				? "Email Address doesn't Exist, Please Signup"
				: "Server Error, Try Again";

		Toast("error", alertText, theme);

		toggleLoader();
	}
};
