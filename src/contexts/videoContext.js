import { createContext, useContext, useReducer, useEffect } from "react";
import { useAxios } from "../customHooks";
import { videoReducer } from "../reducers";

const VideoContext = createContext();

export const useVideo = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
	const initialVideoState = {
		videos: [],
		categories: [],
	};
	const { axiosRequest } = useAxios();

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

	const value = { videoState, videoDispatch };
	return (
		<VideoContext.Provider value={value}>{children}</VideoContext.Provider>
	);
};
