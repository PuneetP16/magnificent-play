import { useSelector } from "react-redux";
import { VideoListing } from "../../components";
import { useDocumentTitle } from "../../customHooks";
import "./WatchLater.css";

export const WatchLater = () => {
	useDocumentTitle("WatchLater | MS");

	const { watchLater } = useSelector((state) => state.videos);

	return (
		<div className="home_page">
			<main className="main--homepage">
				<section className="homepage__section items_container">
					<h3 className="h3 section__heading">WatchLater Videos</h3>
					<ul className="video__items">
						<VideoListing list={watchLater} />
					</ul>
				</section>
			</main>
		</div>
	);
};
