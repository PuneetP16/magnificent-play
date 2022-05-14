import React from "react";
import "./Playlists.css";
import { useDocumentTitle } from "../../customHooks";
import { useVideo } from "../../contexts";
import { CategoryListing, PlaylistCard, VideoListing } from "../../components";

export const Playlists = () => {
	useDocumentTitle("Playlists | MS");
	const {
		videoState: { playlists },
	} = useVideo();

	console.log({ playlists });
	return (
		<div className="home_page">
			<main className="main--homepage">
				<section className="homepage__section categories">
					<h3 className="h3 section__heading">Playlists</h3>

					<ul className="categories__items">
						{playlists.length > 0
							? playlists.map((playlist) => {
									return (
										<PlaylistCard key={playlist._id} playlist={playlist} />
									);
							  })
							: null}
					</ul>
				</section>
			</main>
		</div>
	);
};
