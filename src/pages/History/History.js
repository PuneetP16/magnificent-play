import { useSelector } from "react-redux";
import { Toast, VideoListing } from "../../components";
import { useTheme } from "../../contexts";
import { useAxios, useDocumentTitle } from "../../customHooks";
import { useHandler } from "../../customHooks/useHandler";
import "./History.css";

export const History = () => {
	useDocumentTitle("History | MS");
	const { theme } = useTheme();
	const { axiosRequest } = useAxios();

	const history = useSelector((state) => state.videos.history);
	const { clearHistory } = useHandler();

	const clearHistoryHandler = () => {
		if (history?.length > 0) clearHistory(axiosRequest);
		else {
			Toast("info", "No history to Clear", theme);
		}
	};

	return (
		<div className="home_page">
			<main className="main--homepage">
				<section className="homepage__section items_container playlist__header">
					<h3 className="h3 section__heading">History Videos</h3>
					<button
						className="btn btn--outline--primary btn__playlist"
						onClick={clearHistoryHandler}
					>
						Clear All Videos From History
					</button>
				</section>
				{history?.length > 0 ? (
					<ul className="video__items">
						<VideoListing list={history} />
					</ul>
				) : (
					<div className="h3 section__heading empty__list">
						No Videos watched Yet
					</div>
				)}
			</main>
		</div>
	);
};
