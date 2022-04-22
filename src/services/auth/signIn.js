import axios from "axios";

export const signIn = async ({
	loginData,
	dispatch,
	initialFormState,
	toggleAuth,
	setAlert,
	rememberMe,
	toggleLoader,
}) => {
	try {
		toggleLoader();

		const res = await axios.post("/api/auth/login", loginData);
		if (res.status === 200) {
			setAlert((a) => ({
				...a,
				text: "Logging in...",
				type: "alert--success",
				visibility: true,
			}));

			localStorage.setItem("noteToken", res.data.encodedToken);
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
			setAlert((a) => ({
				...a,
				text: "Invalid Password, Try Again",
				type: "alert--danger",
				visibility: true,
			}));
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

		setAlert((a) => ({
			...a,
			text: alertText,
			type: "alert--danger",
			visibility: true,
		}));
		toggleLoader();
	}
};
