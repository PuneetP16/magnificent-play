import React, { useState } from "react";
import "./Playlists.css";
import { useDocumentTitle } from "../../customHooks";
import { Modal, PlaylistCard } from "../../components";
import { useSelector } from "react-redux";
import { PlaylistPanel } from "../../components/PlaylistPanel/PlaylistPanel";
import { useNavigate } from "react-router-dom";

export const Playlists = () => {
	useDocumentTitle("Playlists | MS");
	const { isAuth } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const playlists = useSelector((state) => state.videos.playlists);
	const [showPlaylist, setShowPlaylist] = useState(false);

	const togglePlaylistPanel = () => {
		if (!isAuth) return navigate("/login");
		setShowPlaylist((v) => !v);
	};

	return (
		<div className="home_page">
			<main className="main--homepage">
				<section className="homepage__section categories playlist__header">
					<h3 className="h3 section__heading">Playlists</h3>
					<button
						className="btn btn--outline--primary btn__playlist"
						onClick={() => setShowPlaylist((_showPlaylist) => !_showPlaylist)}
					>
						Create Playlist
					</button>
				</section>
				<ul className="categories__items">
					{playlists.length > 0 ? (
						playlists.map((playlist) => {
							return <PlaylistCard key={playlist._id} playlist={playlist} />;
						})
					) : (
						<div className="h3 section__heading empty__list">
							No Playlist Created Yet
						</div>
					)}
				</ul>

				{showPlaylist && (
					<Modal setModalVisibility={setShowPlaylist}>
						<PlaylistPanel
							showPlaylist={showPlaylist}
							togglePlaylistPanel={togglePlaylistPanel}
						/>
					</Modal>
				)}
			</main>
		</div>
	);
};
