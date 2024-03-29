import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { VideoListing } from "../../components";
import { useDocumentTitle, usePlaylistAxios } from "../../customHooks";
import "./PlaylistVideos.css";

export const PlaylistVideos = () => {
	useDocumentTitle("PlaylistVideos | MS");
	const playlists = useSelector((state) => state.videos.playlists);

	const { playlistId } = useParams();
	const selectedPlaylist = playlists.find((plist) => plist._id === playlistId);
	const playlistsURL = `/api/user/playlists/${playlistId}`;

	const { output } = usePlaylistAxios({
		method: "GET",
		url: playlistsURL,
		resKey: "playlist",
	});

	const videos = output ? output.videos : selectedPlaylist?.videos;
	return (
		<div className="home_page">
			<main className="main--homepage">
				<section className="homepage__section items_container">
					<h3 className="h3 section__heading">
						Videos in {selectedPlaylist?.title} Playlist
					</h3>
					{videos?.length > 0 ? (
						<ul className="video__items">
							<VideoListing list={videos} />
						</ul>
					) : (
						<div className="h3 section__heading empty__list">No Videos in this Playlist</div>
					)}
				</section>
			</main>
		</div>
	);
};
