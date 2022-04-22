import { useReducer, useContext, createContext } from "react";
import { formReducer } from "../reducers";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
	const localUserData = JSON.parse(localStorage.getItem("noteUser"));
	const initialFormState = localUserData ?? {
		loginData: {
			email: "adarshbalika@gmail.com",
			password: "adarshBalika123",
		},

		userData: {},
	};

	const [{ loginData, userData }, dispatch] = useReducer(
		formReducer,
		initialFormState
	);

	const value = { loginData, userData, dispatch, initialFormState };

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
