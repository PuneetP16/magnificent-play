export const videoReducer = (videoState, action) => {
	switch (action.type) {
		case "GET_VIDEO":
			return { ...videoState, videos: action.payload };
		case "GET_CATEGORIES":
			return { ...videoState, categories: action.payload };

		default:
			return videoState;
	}
};
