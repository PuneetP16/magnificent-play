import axios from "axios";
import { useAlert, useAuth, useLoader } from "../contexts";

export const useAxios = () => {
	const { token } = useAuth();
	const { toggleLoader } = useLoader();
	const { setAlert } = useAlert();
	let headers = {};
	let output, response, error;

	const axiosRequest = async ({ method, url, resKey, data = {}, alert }) => {
		headers = {
			authorization: token,
		};
		try {
			if (!alert) {
				toggleLoader();
			}
			const res = await axios({ url, method, data, headers });
			if (res.status === 200 || res.status === 201) {
				response = res.data;
				output = res.data[resKey];
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
			if (!alert) {
				toggleLoader();
			}
		}
		return { output, response, error };
	};

	return { axiosRequest };
};
