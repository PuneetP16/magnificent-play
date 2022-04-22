import axios from "axios";

export const signUp = async ({
	signUpData,
	navigate,
	loginData,
	userData,
	dispatch,
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
		}
	} catch (error) {
		console.log(error, "Invalid Credentials");
	}
};
