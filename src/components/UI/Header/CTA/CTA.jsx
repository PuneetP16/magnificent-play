import "./CTA.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ThemeToggle } from "../../ThemeToggle/ThemeToggle";
import { useAlert, useAuth, useTheme } from "../../../../contexts";
import { Toast } from "../../Toast/Toast";

export const CTA = () => {
	const { isAuth, toggleAuth } = useAuth();
	const { pathname } = useLocation();
	const { theme } = useTheme();

	const logoutHandler = () => {
		if (isAuth) {
			localStorage.removeItem("videoToken");
			toggleAuth();
			Toast("success", "logged out successfully", theme);
		}
	};

	const isLoginPage = (() => pathname === "/login")();
	const getBtnName = (() =>
		isAuth ? "Logout" : pathname === "/login" ? "Sign Up" : "Login")();
	const getBtnIcon = (() =>
		isAuth ? (
			<i className="bx bx-log-out"></i>
		) : isLoginPage ? (
			<i className="bx bx-user-plus"></i>
		) : (
			<i className="bx bx-log-in"></i>
		))();
	const getLinkPath = (() =>
		isAuth ? "/" : pathname === "/login" ? "/signup" : "/login")();

	return (
		<div className="header__nav_btns">
			<Link
				onClick={logoutHandler}
				className={`btn btn--primary btn--icon auth__btn ${
					isAuth ? "auth__btn--logout" : ""
				}`}
				to={getLinkPath}
			>
				{getBtnName}
				{getBtnIcon}
			</Link>
			<ThemeToggle />
		</div>
	);
};
