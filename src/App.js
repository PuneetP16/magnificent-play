import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "./responsive.css";
import {
	Home,
	Like,
	Explore,
	Login,
	NotFound,
	SignUp,
	WatchLater,
	History,
	SingleVideo,
	Playlists,
	PlaylistVideos,
} from "./pages";
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
import { useAlert, useAuth, useLoader } from "./contexts";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function App() {
	const { pathname } = useLocation();
	const { isAuth } = useSelector((state) => state.auth);
	const { loader } = useLoader();
	const isAuthPage = pathname === "/login" || pathname === "/signup";
	const isNotFoundPage = pathname === "/pagenotfound";

	const injectPageCss = () => {
		if (isNotFoundPage) {
			return "not_found_page";
		}
		if (isAuthPage) {
			return "body auth";
		}
		return "body home";
	};

	return (
		<>
			<ToastContainer />

			<div className={`App ${injectPageCss()}`}>
				{pathname !== "/pagenotfound" && <Header />}

				{isAuthPage || isNotFoundPage ? null : <Aside />}
				{pathname !== "/pagenotfound" && <SearchBoxMobile />}

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/explore" element={<Explore />} />
					<Route path="/explore/:videoId" element={<SingleVideo />} />
					<Route path="/explore/search" element={<Explore />} />
					<Route path="/like" element={<Like />} />
					<Route path="/watchlater" element={<WatchLater />} />
					<Route path="/history" element={<History />} />
					<Route path="/playlists" element={<Playlists />} />
					<Route
						path="/playlists/:playlistId"
						element={
							isAuth ? <PlaylistVideos /> : <Navigate to="/login" replace />
						}
					/>
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
					<Route path="/pagenotfound" element={<NotFound />} />
					<Route path="*" element={<Navigate to="/pagenotfound" replace />} />
				</Routes>
				{isAuthPage || isNotFoundPage ? null : <AsideMobile />}
				{(pathname !== "/pagenotfound" ||
					(pathname !== "/login" && loader)) && <Footer />}
				{loader && <Loader />}
			</div>
		</>
	);
}

export default App;
