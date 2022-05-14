import { useParams } from "react-router-dom";
import { VideoListing } from "../../components";
import { useVideo } from "../../contexts";
import { useDocumentTitle, usePlaylistAxios } from "../../customHooks";
import "./PlaylistVideos.css";

export const PlaylistVideos = () => {
	useDocumentTitle("PlaylistVideos | MS");
	const {
		videoState: { playlists },
	} = useVideo();
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
						<h3 className="h3 section__heading">No Videos in this Playlist</h3>
					)}
				</section>
			</main>
		</div>
	);
};
