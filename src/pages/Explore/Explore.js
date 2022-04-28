import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Filter, VideoListing } from "../../components";
import { useFilter, useVideo } from "../../contexts";
import { useDocumentTitle } from "../../customHooks";
import {
	filterByCategory,
	getSearchedVideos,
	sortItByDate,
} from "../../utilities/filterOperations";
import "./Explore.css";

export const Explore = () => {
	useDocumentTitle("Explore | MS");
	const { category, byLatest, filterDispatch, search } = useFilter();
	const {
		videoState: { videos },
	} = useVideo();

	const location = useLocation();
	const urlParam = new URLSearchParams(location.search);
	const searchQuery = urlParam.get("query");

	useEffect(() => {
		if (searchQuery) {
			filterDispatch({ type: "SEARCH", payload: searchQuery });
		}
	}, [filterDispatch, searchQuery]);

	let filteredList = filterByCategory(videos, category);
	filteredList = sortItByDate(filteredList, byLatest);
	filteredList = getSearchedVideos(filteredList, search);
	return (
		<div className="home_page">
			<main className="main--homepage">
				<section className="homepage__section items_container">
					<h3 className="h3 section__heading">Explore Videos</h3>
					<Filter />
					<ul className="video__items">
						<VideoListing list={filteredList} />
					</ul>
				</section>
			</main>
		</div>
	);
};
