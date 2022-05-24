import axios from "axios";
import { useEffect, useState } from "react";
import { Toast } from "../components";
import { useAlert, useAuth, useLoader, useTheme, useVideo } from "../contexts";

export const usePlaylistAxios = ({ method, url, resKey, alert }) => {
	const { token } = useAuth();
	const { toggleLoader } = useLoader();
	const {
		videoState: { playlists },
	} = useVideo();
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
				if (!alert) {
					toggleLoader();
				}
				const res = await axios({ url, method, headers });
				if (res.status === 200 || res.status === 201) {
					response = res.data;

					setOutput(res.data[resKey]);

					if (!alert) {
						toggleLoader();
					}
					if (alert) {
						Toast("success", alert, theme);
					}
				}
			} catch (err) {
				error = err.response.data.errors[0];
				Toast("error", error, theme);
				if (!alert) {
					toggleLoader();
				}
			}
		})();
	}, [playlists]);

	return { output, response, error };
};
