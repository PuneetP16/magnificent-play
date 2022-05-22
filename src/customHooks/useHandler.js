import { useDispatch } from "react-redux";
import { Toast } from "../components";
import { useTheme } from "../contexts";
import { videosAction } from "../store/videoSlice";

export const useHandler = () => {
	const { theme } = useTheme();
	const dispatch = useDispatch();

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
				dispatch(videosAction.toggleVideoFromLikes(output));
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
				dispatch(videosAction.toggleVideoFromLikes(output));

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
				dispatch(videosAction.toggleVideoFromWatchLater(output));

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
				dispatch(videosAction.toggleVideoFromWatchLater(output));

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
			const { output } = await axiosRequest({
				method: "POST",
				url: historyVideosURL,
				resKey: "history",
				data: { video: video },
			});

			if (!!output) {
				dispatch(videosAction.toggleVideoFromHistory(output));

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
				dispatch(videosAction.toggleVideoFromHistory(output));

				Toast("success", "Removed from History", theme);
			} else {
				Toast("warning", error.response.data.errors[0], theme);
			}
		} catch (error) {
			Toast("warning", error.message, theme);
		}
	};

	const addToPlaylists = async (axiosRequest, playlist, video) => {
		const id = playlist.id;
		try {
			const playlistsURL = "/api/user/playlists";
			const { output, error } = await axiosRequest({
				method: "POST",
				url: playlistsURL,
				resKey: "playlists",
				data: { playlist: playlist },
			});

			if (!!output) {
				var { _id } = output.find((play) => play.id === id);

				dispatch(videosAction.togglePlaylistFromPlaylists(output));

				Toast("success", `Playlist named: "${playlist.title}" created`, theme);
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
				dispatch(videosAction.togglePlaylistFromPlaylists(output));

				Toast("success", `Removed from Playlists`, theme);
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
				data: { video: video },
			});

			if (!!output) {
				var { title } = output;

				dispatch(
					videosAction.toggleVideoFronPlaylist({
						id: _id,
						playlist: output,
					})
				);

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

				dispatch(
					videosAction.toggleVideoFronPlaylist({
						id: _id,
						playlist: output,
					})
				);
				Toast("success", `Removed video from Playlist: "${title}"`, theme);
			} else {
				Toast("warning", error.response.data.errors[0], theme);
			}
		} catch (error) {
			Toast("warning", error.message, theme);
		}
	};

	return {
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
	};
};
