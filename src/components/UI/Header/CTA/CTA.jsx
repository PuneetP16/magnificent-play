import "./CTA.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ThemeToggle } from "../../ThemeToggle/ThemeToggle";
import { useTheme } from "../../../../contexts";
import { Toast } from "../../Toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../../../store/authSlice";

export const CTA = () => {
	let { isAuth } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const { theme } = useTheme();

	const logoutHandler = () => {
		if (isAuth) {
			localStorage.removeItem("videoToken");
			dispatch(authAction.toggleAuth());
			Toast("success", "Logged out successfully", theme);
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
