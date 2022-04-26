import { createContext, useContext, useReducer, useEffect } from "react";
import { useAxios } from "../customHooks";
import { videoReducer } from "../reducers";
import { useAuth } from "./authContext";

const VideoContext = createContext();

export const useVideo = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
	const initialVideoState = {
		videos: [],
		categories: [],
		likes: [],
		watchlater: [],
	};

	const { axiosRequest } = useAxios();
	const { isAuth } = useAuth();
	const [videoState, videoDispatch] = useReducer(
		videoReducer,
		initialVideoState
	);

	useEffect(() => {
		(async () => {
			const videosURL = "/api/videos";
			const { output } = await axiosRequest({
				method: "GET",
				url: videosURL,
				resKey: "videos",
			});

			videoDispatch({
				type: "GET_VIDEO",
				payload: output,
			});
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		(async () => {
			const categoriesURL = "/api/categories";
			const { output } = await axiosRequest({
				method: "GET",
				url: categoriesURL,
				resKey: "categories",
			});

			videoDispatch({
				type: "GET_CATEGORIES",
				payload: output,
			});
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		(async () => {
			const likedVideosURL = "/api/user/likes";
			const { output } = await axiosRequest({
				method: "GET",
				url: likedVideosURL,
				resKey: "likes",
			});

			videoDispatch({
				type: "GET_LIKED_VIDEOS",
				payload: output,
			});
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuth]);

	useEffect(() => {
		(async () => {
			const watchLaterVideosURL = "/api/user/watchlater";
			const { output } = await axiosRequest({
				method: "GET",
				url: watchLaterVideosURL,
				resKey: "watchlater",
			});

			videoDispatch({
				type: "GET_WATCHLATER_VIDEOS",
				payload: output,
			});
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuth]);

	const addToLikedVideos = async (axiosRequest, video) => {
		try {
			const likedVideosURL = "/api/user/likes";
			const { output } = await axiosRequest({
				method: "POST",
				url: likedVideosURL,
				resKey: "likes",
				data: { video: video },
			});
			videoDispatch({
				type: "POST_LIKED_VIDEOS",
				payload: output,
			});
		} catch (error) {
			console.log("from addToLikedVideos", error);
		}
	};

	const removeFromLikedVideos = async (axiosRequest, video) => {
		const { _id } = video;
		try {
			const removeFromlikedVideosURL = `/api/user/likes/${_id}`;
			const { output } = await axiosRequest({
				method: "DELETE",
				url: removeFromlikedVideosURL,
				resKey: "likes",
			});
			videoDispatch({
				type: "REMOVE_LIKED_VIDEOS",
				payload: output,
			});
		} catch (error) {
			console.log("from removeFromLikedVideos", error);
		}
	};

	const addToWatchLaterVideos = async (axiosRequest, video) => {
		try {
			const watchLaterVideosURL = "/api/user/watchlater";
			const { output } = await axiosRequest({
				method: "POST",
				url: watchLaterVideosURL,
				resKey: "watchlater",
				data: { video: video },
			});
			videoDispatch({
				type: "POST_WATCHLATER_VIDEOS",
				payload: output,
			});
		} catch (error) {
			console.log("from addToWatchLaterVideos", error);
		}
	};

	const removeFromWatchLaterVideos = async (axiosRequest, video) => {
		const { _id } = video;
		try {
			const removeFromWatchLaterVideosURL = `/api/user/watchlater/${_id}`;
			const { output } = await axiosRequest({
				method: "DELETE",
				url: removeFromWatchLaterVideosURL,
				resKey: "watchlater",
			});
			videoDispatch({
				type: "REMOVE_WATCHLATER_VIDEOS",
				payload: output,
			});
		} catch (error) {
			console.log("from removeFromWatchLaterVideos", error);
		}
	};

	const value = {
		videoState,
		videoDispatch,
		addToLikedVideos,
		removeFromLikedVideos,
		addToWatchLaterVideos,
		removeFromWatchLaterVideos,
	};
	
	return (
		<VideoContext.Provider value={value}>{children}</VideoContext.Provider>
	);
};
