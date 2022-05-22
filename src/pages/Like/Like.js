import { useSelector } from "react-redux";
import { VideoListing } from "../../components";
import { useDocumentTitle } from "../../customHooks";
import "./Like.css";

export const Like = () => {
	useDocumentTitle("Like | MS");

	const likes = useSelector((state) => state.videos.likes);

	return (
		<div className="home_page">
			<main className="main--homepage">
				<section className="homepage__section items_container">
					<h3 className="h3 section__heading">Liked Videos</h3>
					<ul className="video__items">
						<VideoListing list={likes} />
					</ul>
				</section>
			</main>
		</div>
	);
};
