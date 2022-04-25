import React from "react";
import "./Home.css";
import { banner3 } from "../../data/image/productImages";
import { useDocumentTitle } from "../../customHooks";
import { Link } from "react-router-dom";
import { useVideo } from "../../contexts";
import { CategoryListing, VideoListing } from "../../components";

export const Home = () => {
	useDocumentTitle("Home | MS");
	const {
		videoState: { videos = [], categories },
	} = useVideo();
	return (
		<div className="home_page">
			<main className="main--homepage">
				<section className="promotion_container">
					<Link to="explore">
						<img
							src={banner3}
							alt="banner bat"
							className="video__banner image--responsive"
						/>
					</Link>
				</section>
				<section className="homepage__section categories">
					<h3 className="h3 section__heading">Video Categories</h3>

					<ul className="categories__items">
						<CategoryListing categories={categories} />
					</ul>
				</section>
				<section className="homepage__section items_container">
					<h3 className="h3 section__heading">Trending Videos</h3>
					<ul className="video__items">
						<VideoListing list={videos.slice(0, 8)} />
					</ul>
				</section>
			</main>
		</div>
	);
};
