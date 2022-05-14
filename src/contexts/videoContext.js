import { createContext, useContext, useReducer, useEffect } from "react";
import { useAxios } from "../customHooks";
import { videoReducer } from "../reducers";
import { useAlert } from "./alertContext";
import { useAuth } from "./authContext";

const VideoContext = createContext();

export const useVideo = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
	const initialVideoState = {
		videos: [],
		singleVideo: {},
		categories: [],
		likes: [],
		watchlater: [],
		history: [],
		playlists: [],
		playlist: {},
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
	}, [isAuth]);

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
	}, [isAuth]);

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

	useEffect(() => {
		(async () => {
			const historyVideosURL = "/api/user/history";
			const { output } = await axiosRequest({
				method: "GET",
				url: historyVideosURL,
				resKey: "history",
			});

			videoDispatch({
				type: "GET_HISTORY_VIDEOS",
				payload: output,
			});
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuth]);

	useEffect(() => {
		(async () => {
			const playlistsURL = "/api/user/playlists";
			const { output } = await axiosRequest({
				method: "GET",
				url: playlistsURL,
				resKey: "playlists",
			});

			videoDispatch({
				type: "GET_PLAYLISTS",
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

	const addToHistoryVideos = async (axiosRequest, video) => {
		try {
			const historyVideosURL = "/api/user/history";
			const { output } = await axiosRequest({
				method: "POST",
				url: historyVideosURL,
				resKey: "history",
				alert: "Added to history",
				data: { video: video },
			});
			videoDispatch({
				type: "POST_HISTORY_VIDEOS",
				payload: output,
			});
		} catch (error) {
			console.log("from addToHistoryVideos", error);
		}
	};

	const removeFromHistoryVideos = async (axiosRequest, video) => {
		const { _id } = video;
		try {
			const removeFromHistoryVideosURL = `/api/user/history/${_id}`;
			const { output } = await axiosRequest({
				method: "DELETE",
				url: removeFromHistoryVideosURL,
				resKey: "history",
			});
			videoDispatch({
				type: "REMOVE_HISTORY_VIDEOS",
				payload: output,
			});
		} catch (error) {
			console.log("from removeFromHistoryVideos", error);
		}
	};

	const addToPlaylists = async (axiosRequest, playlist) => {
		try {
			const playlistsURL = "/api/user/playlists";
			const { output } = await axiosRequest({
				method: "POST",
				url: playlistsURL,
				resKey: "playlists",
				alert: "playlist created",
				data: { playlist: playlist },
			});
			videoDispatch({
				type: "POST_PLAYLIST",
				payload: output,
			});
		} catch (error) {
			console.log("from addToPlaylists", error);
		}
	};

	const removeFromPlaylists = async (axiosRequest, playlist) => {
		const { _id } = playlist;
		try {
			const playlistsURL = `/api/user/playlists/${_id}`;
			const { output } = await axiosRequest({
				method: "DELETE",
				url: playlistsURL,
				resKey: "playlists",
			});
			videoDispatch({
				type: "REMOVE_PLAYLIST",
				payload: output,
			});
		} catch (error) {
			console.log("from removeFromPlaylists", error);
		}
	};

	const getPlaylist = async (axiosRequest, playlistId) => {
		try {
			const playlistsURL = `/api/user/playlists/${playlistId}`;
			const { output } = await axiosRequest({
				method: "GET",
				url: playlistsURL,
				resKey: "playlist",
			});
			videoDispatch({
				type: "GET_PLAYLIST",
				payload: output,
			});
		} catch (error) {
			console.log("from getPlaylist", error);
		}
	};

	const addVideoToPlaylist = async (axiosRequest, _id, video) => {
		try {
			const playlistsURL = `/api/user/playlists/${_id}`;
			const { output } = await axiosRequest({
				method: "POST",
				url: playlistsURL,
				resKey: "playlist",
				alert: "Added to playlist",
				data: { video: video },
			});
			videoDispatch({
				type: "POST_VIDEO_IN_PLAYLIST",
				payload: output,
				playlistId: _id,
			});
		} catch (error) {
			console.log("from addVideoToPlaylist", error);
		}
	};
	const removeVideoFromPlaylist = async (axiosRequest, _id, video) => {
		try {
			const playlistsURL = `/api/user/playlists/${_id}/${video._id}`;
			const { output } = await axiosRequest({
				method: "DELETE",
				url: playlistsURL,
				resKey: "playlist",
			});
			videoDispatch({
				type: "REMOVE_VIDEO_FROM_PLAYLIST",
				payload: output,
				playlistId: _id,
			});
		} catch (error) {
			console.log("from removeVideoFromPlaylist", error);
		}
	};

	const value = {
		videoState,
		videoDispatch,
		addToLikedVideos,
		removeFromLikedVideos,
		addToWatchLaterVideos,
		removeFromWatchLaterVideos,
		addToHistoryVideos,
		removeFromHistoryVideos,
		addToPlaylists,
		removeFromPlaylists,
		addVideoToPlaylist,
		removeVideoFromPlaylist,
		getPlaylist,
	};

	return (
		<VideoContext.Provider value={value}>{children}</VideoContext.Provider>
	);
};
