export const videoReducer = (videoState, action) => {
	switch (action.type) {
		case "GET_VIDEO":
			return { ...videoState, videos: action.payload };
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
		default:
			return videoState;
	}
};
