import { useState, useEffect, useContext, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAxios } from "../customHooks";
import { videosAction } from "../store/videoSlice";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);
export const ThemeProvider = ({ children }) => {
	const [flag, setFlag] = useState(false);
	const currentThemeState = localStorage.getItem("current_theme");
	const [theme, setTheme] = useState(currentThemeState ?? "light");

	const themeHandler = () => {
		setTheme((theme) => (theme === "light" ? "dark" : "light"));
	};

	useEffect(() => {
		document.documentElement.setAttribute("current_theme", theme);
		localStorage.setItem("current_theme", theme);
	}, [theme]);

	const { axiosRequest } = useAxios();
	const { isAuth } = useSelector((state) => state.auth);
	const dispatchGet = useDispatch();

	useEffect(() => {
		(async () => {
			const videosURL = "/api/videos";
			const { output } = await axiosRequest({
				method: "GET",
				url: videosURL,
				resKey: "videos",
			});

			dispatchGet(videosAction.getVideos(output));
		})();

		(async () => {
			const categoriesURL = "/api/categories";
			const { output } = await axiosRequest({
				method: "GET",
				url: categoriesURL,
				resKey: "categories",
			});

			dispatchGet(videosAction.getCategories(output));
		})();

		// (async () => {
		// 	const likedVideosURL = "/api/user/likes";
		// 	const { output } = await axiosRequest({
		// 		method: "GET",
		// 		url: likedVideosURL,
		// 		resKey: "likes",
		// 	});

		// 	dispatchGet(videosAction.toggleVideoFromLikes(output));
		// })();

		// (async () => {
		// 	const watchLaterVideosURL = "/api/user/watchlater";
		// 	const { output } = await axiosRequest({
		// 		method: "GET",
		// 		url: watchLaterVideosURL,
		// 		resKey: "watchlater",
		// 	});

		// 	dispatchGet(videosAction.toggleVideoFromWatchLater(output));
		// })();

		// (async () => {
		// 	const historyVideosURL = "/api/user/history";
		// 	const { output } = await axiosRequest({
		// 		method: "GET",
		// 		url: historyVideosURL,
		// 		resKey: "history",
		// 	});

		// 	dispatchGet(videosAction.toggleVideoFromHistory(output));
		// })();

		// (async () => {
		// 	const playlistsURL = "/api/user/playlists";
		// 	const { output } = await axiosRequest({
		// 		method: "GET",
		// 		url: playlistsURL,
		// 		resKey: "playlists",
		// 	});

		// 	dispatchGet(videosAction.togglePlaylistFromPlaylists(output));
		// })();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuth]);

	const value = { theme, themeHandler };
	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};
