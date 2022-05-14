import axios from "axios";
import { useEffect, useState } from "react";
import { useAlert, useAuth, useLoader, useVideo } from "../contexts";

export const usePlaylistAxios = ({ method, url, resKey, alert }) => {
	const { token } = useAuth();
	const { toggleLoader } = useLoader();
	const { setAlert } = useAlert();
	const {
		videoState: { playlists },
	} = useVideo();
	let headers = {};
	let response, error;
	const [output, setOutput] = useState({});

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
						setAlert((a) => ({
							...a,
							visibility: true,
							text: alert,
							type: "alert--success",
						}));
					}
				}
			} catch (err) {
				error = err.response.data.errors[0];
				console.log(error);
				if (!alert) {
					toggleLoader();
				}
			}
		})();
	}, [playlists]);

	return { output, response, error };
};
