import { useEffect } from "react";
import { bxIcons } from "../../../data/icons";
import "./Alert.css";

export const Alert = ({ alert, setAlert }) => {
	const onClickHandler = () => {
		setAlert((s) => ({
			...s,
			visibility: !s.visibility,
		}));
	};
	const { text, visibility, type } = alert;

	useEffect(() => {
		const timeOutId = setTimeout(() => {
			setAlert((s) => ({
				...s,
				visibility: false,
			}));
		}, 2000);

		return () => clearTimeout(timeOutId);
	}, [setAlert, alert.visibility]);

	return visibility ? (
		<div className="alerts flex-col-align-center fw">
			<div className={`alert ${type} alert--dismissable`}>
				{text}
				<button
					onClick={onClickHandler}
					className="btn btn--icon btn--close--transparent alert--btn__dismiss btn--circular"
				>
					{bxIcons.cross}
				</button>
			</div>
		</div>
	) : null;
};
