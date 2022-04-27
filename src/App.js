import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "./responsive.css";
import { Home, Like, Login, SignUp, WatchLater } from "./pages";
import { MockBee } from "./backend/mockdocs/MockBee";
import { MockAPI } from "./backend/mockdocs/MockMan";
import {
	Aside,
	AsideMobile,
	Footer,
	Header,
	Loader,
	SearchBoxMobile,
} from "./components";
import { useAuth, useLoader } from "./contexts";
import { Explore } from "./pages/Explore/Explore";

function App() {
	const { pathname } = useLocation();
	const { isAuth } = useAuth();
	const { loader } = useLoader();
	const isAuthPage = pathname === "/login" || pathname === "/signup";
	const isNotFoundPage = pathname === "/pagenotfound";

	const injectPageCss = () => {
		if (isNotFoundPage) {
			return "not_found_page";
		}
		if (isAuthPage) {
			return "auth";
		}
		return "home";
	};

	return (
		<div className={`App body ${injectPageCss()}`}>
			<Header />
			{isAuthPage || isNotFoundPage ? null : <Aside />}
			<SearchBoxMobile />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/explore" element={<Explore />} />
				<Route path="/like" element={<Like />} />
				<Route path="/watchlater" element={<WatchLater />} />
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
			{isAuthPage || isNotFoundPage ? null : <AsideMobile />}
			{(pathname !== "/pagenotfound" || (pathname !== "/login" && loader)) && (
				<Footer />
			)}
			{loader && <Loader />}
		</div>
	);
}

export default App;
