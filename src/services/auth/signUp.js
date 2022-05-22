import axios from "axios";
import { Toast } from "../../components";

export const signUp = async ({
	signUpData,
	navigate,
	loginData,
	userData,
	dispatch,
	theme,
}) => {
	try {
		const res = await axios.post("/api/auth/signup", signUpData);
		if (res.status === 201) {
			dispatch({
				type: "HANDLE_SUBMIT",

				initialFormState: { loginData: { ...signUpData } },

				payload: {
					userData,
					...loginData,
				},
			});
			navigate("/login");
			Toast("success", "Successfully created account, just login", theme);
		}
	} catch (error) {
		Toast("error", error.message, theme);
	}
};
