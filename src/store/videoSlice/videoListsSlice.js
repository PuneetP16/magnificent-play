import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	likes: [],
	watchLater: [],
	history: [],
	playlists: [],
	categories: [],
	videos: [],
};

export const videosSlice = createSlice({
	name: "videos",
	initialState: initialState,
	reducers: {
		getVideos(state, action) {
			state.videos = action.payload;
		},

		getCategories(state, action) {
			state.categories = action.payload;
		},

		toggleVideoFromLikes(state, action) {
			state.likes = action.payload;
		},

		toggleVideoFromWatchLater(state, action) {
			state.watchLater = action.payload;
		},

		toggleVideoFromHistory(state, action) {
			state.history = action.payload;
		},

		togglePlaylistFromPlaylists(state, action) {
			state.playlists = action.payload;
		},

		toggleVideoFronPlaylist(state, action) {
			state.playlists = state.playlists.map((p) =>
				p._id === action.payload.id ? action.payload.playlist : p
			);
		},

		resetVideosList(state) {
			state = {
				...state,
				likes: [],
				watchLater: [],
				history: [],
				playlists: [],
			};
		},
	},
});

export const videosAction = videosSlice.actions;
