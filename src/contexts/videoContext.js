import { createContext, useContext, useReducer, useEffect } from "react";
import { Toast } from "../components";
import { useAxios } from "../customHooks";
import { videoReducer } from "../reducers";
import { useAlert } from "./alertContext";
import { useAuth } from "./authContext";
import { useTheme } from "./themeContext";

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

	const { theme } = useTheme();
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
			const { output, error } = await axiosRequest({
				method: "POST",
				url: likedVideosURL,
				resKey: "likes",
				data: { video: video },
			});

			if (!!output) {
				videoDispatch({
					type: "POST_LIKED_VIDEOS",
					payload: output,
				});
				Toast("success", "Added to Liked List", theme);
			} else {
				Toast("warning", error.response.data.errors[0], theme);
			}
		} catch (error) {
			Toast("warning", error.message, theme);
		}
	};

	const removeFromLikedVideos = async (axiosRequest, video) => {
		const { _id } = video;
		try {
			const removeFromlikedVideosURL = `/api/user/likes/${_id}`;
			const { output, error } = await axiosRequest({
				method: "DELETE",
				url: removeFromlikedVideosURL,
				resKey: "likes",
			});

			if (!!output) {
				videoDispatch({
					type: "REMOVE_LIKED_VIDEOS",
					payload: output,
				});
				Toast("success", "Removed From Liked List", theme);
			} else {
				Toast("warning", error.response.data.errors[0], theme);
			}
		} catch (error) {
			Toast("warning", error.message, theme);
		}
	};

	const addToWatchLaterVideos = async (axiosRequest, video) => {
		try {
			const watchLaterVideosURL = "/api/user/watchlater";
			const { output, error } = await axiosRequest({
				method: "POST",
				url: watchLaterVideosURL,
				resKey: "watchlater",
				data: { video: video },
			});

			if (!!output) {
				videoDispatch({
					type: "POST_WATCHLATER_VIDEOS",
					payload: output,
				});
				Toast("success", "Added to watch later List", theme);
			} else {
				Toast("warning", error.response.data.errors[0], theme);
			}
		} catch (error) {
			Toast("warning", error.message, theme);
		}
	};

	const removeFromWatchLaterVideos = async (axiosRequest, video) => {
		const { _id } = video;
		try {
			const removeFromWatchLaterVideosURL = `/api/user/watchlater/${_id}`;
			const { output, error } = await axiosRequest({
				method: "DELETE",
				url: removeFromWatchLaterVideosURL,
				resKey: "watchlater",
			});

			if (!!output) {
				videoDispatch({
					type: "REMOVE_WATCHLATER_VIDEOS",
					payload: output,
				});
				Toast("success", "Removed From watch later List", theme);
			} else {
				Toast("warning", error.response.data.errors[0], theme);
			}
		} catch (error) {
			Toast("warning", error.message, theme);
		}
	};

	const addToHistoryVideos = async (axiosRequest, video) => {
		try {
			const historyVideosURL = "/api/user/history";
			const { output, error } = await axiosRequest({
				method: "POST",
				url: historyVideosURL,
				resKey: "history",
				data: { video: video },
			});

			if (!!output) {
				videoDispatch({
					type: "POST_HISTORY_VIDEOS",
					payload: output,
				});
				Toast("success", "Added to History", theme);
			}
		} catch (error) {
			Toast("warning", error.message, theme);
		}
	};

	const removeFromHistoryVideos = async (axiosRequest, video) => {
		const { _id } = video;
		try {
			const removeFromHistoryVideosURL = `/api/user/history/${_id}`;
			const { output, error } = await axiosRequest({
				method: "DELETE",
				url: removeFromHistoryVideosURL,
				resKey: "history",
			});

			if (!!output) {
				videoDispatch({
					type: "REMOVE_HISTORY_VIDEOS",
					payload: output,
				});
				Toast("success", "Removed from History", theme);
			} else {
				Toast("warning", error.response.data.errors[0], theme);
			}
		} catch (error) {
			Toast("warning", error.message, theme);
		}
	};

	const addToPlaylists = async (axiosRequest, playlist, video) => {
		const title = playlist.title;
		try {
			const playlistsURL = "/api/user/playlists";
			const { output, error } = await axiosRequest({
				method: "POST",
				url: playlistsURL,
				resKey: "playlists",
				alert: "playlist created",
				data: { playlist: playlist },
			});

			if (!!output) {
				var { _id } = output.find((play) => play.title === title);
				videoDispatch({
					type: "POST_PLAYLIST",
					payload: output,
				});
				Toast("success", `Playlist named: "${title}" created`, theme);
				addVideoToPlaylist(axiosRequest, _id, video);
			} else {
				Toast("warning", error.response.data.errors[0], theme);
			}
		} catch (error) {
			Toast("warning", error.message, theme);
		}
	};

	const removeFromPlaylists = async (axiosRequest, playlist) => {
		const { _id } = playlist;
		try {
			const playlistsURL = `/api/user/playlists/${_id}`;
			const { output, error } = await axiosRequest({
				method: "DELETE",
				url: playlistsURL,
				resKey: "playlists",
			});

			if (!!output) {
				videoDispatch({
					type: "REMOVE_PLAYLIST",
					payload: output,
				});
				Toast("success", `Removed from Playlis`, theme);
			} else {
				Toast("warning", error.response.data.errors[0], theme);
			}
		} catch (error) {
			Toast("warning", error.message, theme);
		}
	};

	const getPlaylist = async (axiosRequest, playlistId) => {
		try {
			const playlistsURL = `/api/user/playlists/${playlistId}`;
			const { output, error } = await axiosRequest({
				method: "GET",
				url: playlistsURL,
				resKey: "playlist",
			});

			if (!!output) {
				videoDispatch({
					type: "GET_PLAYLIST",
					payload: output,
				});
				Toast("success", "Fetching... playlist", theme);
			} else {
				Toast("warning", error.response.data.errors[0], theme);
			}
		} catch (error) {
			Toast("warning", error.message, theme);
		}
	};

	const addVideoToPlaylist = async (axiosRequest, _id, video) => {
		try {
			const playlistsURL = `/api/user/playlists/${_id}`;
			const { output, error } = await axiosRequest({
				method: "POST",
				url: playlistsURL,
				resKey: "playlist",
				alert: "Added to playlist",
				data: { video: video },
			});

			if (!!output) {
				console.log(output);
				var { title } = output;
				videoDispatch({
					type: "POST_VIDEO_IN_PLAYLIST",
					payload: output,
					playlistId: _id,
				});
				Toast("success", `Added video in Playlist: "${title}"`, theme);
			} else {
				Toast("warning", error.response.data.errors[0], theme);
			}
		} catch (error) {
			Toast("warning", error.message, theme);
		}
	};
	const removeVideoFromPlaylist = async (axiosRequest, _id, video) => {
		try {
			const playlistsURL = `/api/user/playlists/${_id}/${video._id}`;
			const { output, error } = await axiosRequest({
				method: "DELETE",
				url: playlistsURL,
				resKey: "playlist",
			});

			if (!!output) {
				var { title } = output;
				videoDispatch({
					type: "REMOVE_VIDEO_FROM_PLAYLIST",
					payload: output,
					playlistId: _id,
				});
				Toast("success", `Removed video from Playlist: "${title}"`, theme);
			} else {
				Toast("warning", error.response.data.errors[0], theme);
			}
		} catch (error) {
			Toast("warning", error.message, theme);
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
