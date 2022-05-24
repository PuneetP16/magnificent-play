import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Toast } from "../components";
import { useLoader, useTheme } from "../contexts";

export const usePlaylistAxios = ({ method, url, resKey }) => {
	const { token } = useSelector((state) => state.auth);
	const { toggleLoader } = useLoader();

	const playlists = useSelector((state) => state.videos.playlists);

	let headers = {};
	let response, error;
	const [output, setOutput] = useState({});
	const { theme } = useTheme();
	headers = {
		authorization: token,
	};

	useEffect(() => {
		(async () => {
			try {
				toggleLoader();
				const res = await axios({ url, method, headers });
				if (res.status === 200 || res.status === 201) {
					response = res.data;

					setOutput(res.data[resKey]);

					toggleLoader();
				}
			} catch (err) {
				error = err.response.data.errors[0];
				Toast("error", error, theme);
				toggleLoader();
			}
		})();
		// eslint-disable-next-line
	}, [playlists]);

	return { output, response, error };
};
