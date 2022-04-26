import { Filter, VideoListing } from "../../components";
import { useVideo } from "../../contexts";
import { useDocumentTitle } from "../../customHooks";
import "./Explore.css";

export const Explore = () => {
	useDocumentTitle("Explore | MS");

	const {
		videoState: { videos },
	} = useVideo();
	return (
		<div className="home_page">
			<main className="main--homepage">
				<section className="homepage__section items_container">
					<h3 className="h3 section__heading">Explore Videos</h3>
					<Filter />
					<ul className="video__items">
						<VideoListing list={videos} />
					</ul>
				</section>
			</main>
		</div>
	);
};
