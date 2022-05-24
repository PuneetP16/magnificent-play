import axios from "axios";
import { Toast } from "../../components";
import { userAction } from "../../store/userSlice";

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
			dispatch(
				userAction.submitHandler({
					initialFormState: { loginData: { ...signUpData } },

					userData: {
						userData,
						...loginData,
					},
				})
			);
			navigate("/login");
			Toast("success", "Successfully created account, just login", theme);
		}
	} catch (error) {
		Toast("error", error.message, theme);
	}
};
