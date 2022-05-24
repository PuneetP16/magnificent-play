import axios from "axios";
import { useSelector } from "react-redux";
import { useLoader } from "../contexts";

export const useAxios = () => {
	const { token } = useSelector((state) => state.auth);

	const { toggleLoader } = useLoader();

	let headers = {};
	let output, response, error;

	const axiosRequest = async ({ method, url, resKey, data = {} }) => {
		headers = {
			authorization: token,
		};
		try {
			toggleLoader();
			const res = await axios({ url, method, data, headers });
			if (res.status === 200 || res.status === 201) {
				response = res.data;
				output = res.data[resKey];
				toggleLoader();
			}
		} catch (err) {
			toggleLoader();
		}
		return { output, response, error };
	};

	return { axiosRequest };
};
