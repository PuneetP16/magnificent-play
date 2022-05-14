export const videoReducer = (videoState, action) => {
	switch (action.type) {
		case "GET_VIDEO":
			return { ...videoState, videos: action.payload };
		case "GET_SINGLE_VIDEO":
			return { ...videoState, singleVideo: action.payload };
		case "GET_CATEGORIES":
			return { ...videoState, categories: action.payload };
		case "GET_LIKED_VIDEOS":
			return { ...videoState, likes: action.payload };
		case "POST_LIKED_VIDEOS":
			return { ...videoState, likes: action.payload };
		case "REMOVE_LIKED_VIDEOS":
			return { ...videoState, likes: action.payload };
		case "GET_WATCHLATER_VIDEOS":
			return { ...videoState, watchlater: action.payload };
		case "POST_WATCHLATER_VIDEOS":
			return { ...videoState, watchlater: action.payload };
		case "REMOVE_WATCHLATER_VIDEOS":
			return { ...videoState, watchlater: action.payload };
		case "GET_HISTORY_VIDEOS":
			return { ...videoState, history: action.payload };
		case "POST_HISTORY_VIDEOS":
			return { ...videoState, history: action.payload };
		case "REMOVE_HISTORY_VIDEOS":
			return { ...videoState, history: action.payload };
		case "GET_PLAYLISTS":
			return { ...videoState, playlists: action.payload };
		case "POST_PLAYLIST":
			return { ...videoState, playlists: action.payload };
		case "POST_VIDEO_IN_PLAYLIST":
			return {
				...videoState,
				playlists: [
					...videoState.playlists.map((p) =>
						p._id === action.playlistId ? action.payload : p
					),
				],
			};
		case "REMOVE_VIDEO_FROM_PLAYLIST":
			return {
				...videoState,
				playlists: [
					...videoState.playlists.map((p) =>
						p._id === action.playlistId ? action.payload : p
					),
				],
			};
		case "REMOVE_PLAYLIST":
			return { ...videoState, playlists: action.payload };
		case "GET_PLAYLIST":
			return { ...videoState, playlist: action.payload };
		default:
			return videoState;
	}
};
