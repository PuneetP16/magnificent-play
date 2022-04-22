import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Home, Login, SignUp } from "./pages";
import { MockBee } from "./backend/mockdocs/MockBee";
import { MockAPI } from "./backend/mockdocs/MockMan";
import { Footer, Header, Loader, SearchBoxMobile } from "./components";
import { useAuth, useLoader } from "./contexts";

function App() {
	const { pathname } = useLocation();
	const { isAuth } = useAuth();
	const { loader } = useLoader();

	const isHomePage = pathname === "/";
	const isAuthPage = pathname === "/login" || pathname === "/signup";
	const isNotFoundPage = pathname === "/pagenotfound";

	const injectPageCss = () => {
		if (isNotFoundPage) {
			return "not_found_page";
		}
		if (isAuthPage) {
			return "auth";
		}
		if (isHomePage) {
			return "home";
		}
	};

	return (
		<div className={`App body ${injectPageCss()}`}>
			<Header />
			<SearchBoxMobile />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/mockbee" element={<MockBee />} />
				<Route path="/mockman" element={<MockAPI />} />
				<Route
					path="/login"
					element={isAuth ? <Navigate to="/" replace /> : <Login />}
				/>
				<Route
					path="/signup"
					element={isAuth ? <Navigate to="/" replace /> : <SignUp />}
				/>
				<Route path="/loader" element={<Loader />} />
				<Route path="*" element={<Navigate to="/pagenotfound" replace />} />
			</Routes>
			{(pathname !== "/pagenotfound" || (pathname !== "/login" && loader)) && (
				<Footer />
			)}
			{loader && <Loader />}
		</div>
	);
}

export default App;
