export const formReducer = ({ loginData, userData }, action) => {
	switch (action.type) {
		case "HANDLE_LOGIN_INPUT":
			return {
				loginData: { ...loginData, [action.field]: action.payload },
				userData: { ...userData },
			};

		case "HANDLE_SUBMIT":
			let data = {
				loginData: {
					email: "adarshbalika@gmail.com",
					password: "adarshBalika123",
				},
				userData: { ...userData, ...action.payload.userData },
			};
			localStorage.removeItem("noteUser");
			localStorage.setItem("noteUser", JSON.stringify(data));

			data = {
				loginData: { ...loginData, ...action.initialFormState.loginData },
				userData: { ...userData, ...action.payload.userData },
			};
			return data;
		default:
			return { loginData, userData };
	}
};
