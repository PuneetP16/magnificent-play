import { useState, useContext, createContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const token = localStorage.getItem("noteToken");

	const [isAuth, setIsAuth] = useState(token ? true : false);

	const toggleAuth = () => {
		setIsAuth((auth) => !auth);
	};

	const value = { isAuth, toggleAuth, token, setIsAuth };
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
	
};
