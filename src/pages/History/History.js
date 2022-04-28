import { VideoListing } from "../../components";
import { useVideo } from "../../contexts";
import { useDocumentTitle } from "../../customHooks";
import "./History.css";

export const History = () => {
	useDocumentTitle("History | MS");

	const {
		videoState: { history },
	} = useVideo();

	return (
		<div className="home_page">
			<main className="main--homepage">
				<section className="homepage__section items_container">
					<h3 className="h3 section__heading">History Videos</h3>
					<ul className="video__items">
						<VideoListing list={history} />
					</ul>
				</section>
			</main>
		</div>
	);
};
