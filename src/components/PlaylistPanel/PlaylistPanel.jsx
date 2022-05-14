import { useState } from "react";
import { useVideo } from "../../contexts";
import { useAxios } from "../../customHooks";
import { bxIcons } from "../../data/icons";
import { isVideoInList } from "../../utilities/checkIfExist";
import "./PlaylistPanel.css";

export const PlaylistPanel = ({ togglePlaylistPanel, video }) => {
	const initialPlaylist = {
		title: "",
		description: "",
	};
	const [playlistObj, setPlaylistObj] = useState(initialPlaylist);

	const [createPlaylist, setCreatePlaylist] = useState(false);

	const {
		videoState: { playlists },
		addToPlaylists,
		removeFromPlaylists,
		addVideoToPlaylist,
		removeVideoFromPlaylist,
	} = useVideo();
	const { axiosRequest } = useAxios();

	const playlistInputHandler = (e) => {
		setPlaylistObj((playlist) => ({
			...playlist,
			[e.target.name]: e.target.value,
		}));
	};

	console.log({ playlists });

	const savePlaylist = (e) => {
		e.preventDefault();
		if (playlistObj.title) {
			addToPlaylists(axiosRequest, playlistObj);

			setPlaylistObj(initialPlaylist);
		}
	};

	const toggleCreatePlaylist = () => {
		setCreatePlaylist((isCreate) => !isCreate);
	};

	const toggleVideoFromPlaylist = (_id) => {
		const currPlaylist = playlists.find((playlist) => playlist._id === _id);
		isVideoInList(video, currPlaylist.videos)
			? removeVideoFromPlaylist(axiosRequest, _id, video)
			: addVideoToPlaylist(axiosRequest, _id, video);
	};

	const noPlaylists = !(playlists.length > 0);

	return (
		<div className="playlist__panel">
			<section className="playlist_header">
				<div className="playlist_header__text">
					{createPlaylist
						? "Create New Playlist"
						: noPlaylists
						? "No Playlist Available"
						: "Save to Playlist"}
				</div>
				<div
					className="btn btn--outline--primary btn--circular btn--dismiss"
					title="Close Panel"
					onClick={togglePlaylistPanel}
				>
					{bxIcons.cross}
				</div>
			</section>
			<section className="playlist__listing">
				{noPlaylists
					? null
					: playlists.map((playlist) => {
							return (
								<li key={playlist._id} className="playlist__item">
									<input
										onChange={() => toggleVideoFromPlaylist(playlist._id)}
										checked={
											playlist.videos.findIndex(
												(_video) => _video._id === video._id
											) !== -1
										}
										type="checkbox"
										id={playlist._id}
										className="playlist__checkbox"
									/>
									<label htmlFor={playlist._id} className="playlist__label">
										{playlist.title}
									</label>
								</li>
							);
					  })}
			</section>
			<form className="playlist__form">
				{createPlaylist ? (
					<>
						<input
							autoFocus
							value={playlistObj.title}
							name="title"
							type="text"
							className="playlist__name input playlist_input"
							placeholder="Playlist Name.."
							onChange={playlistInputHandler}
							required
						/>

						<textarea
							value={playlistObj.description}
							onChange={playlistInputHandler}
							placeholder="Playlist Description"
							name="description"
							className="playlist__textarea playlist_input"
							rows="2"
						/>
					</>
				) : null}

				<button
					onClick={createPlaylist ? savePlaylist : toggleCreatePlaylist}
					className="btn btn--primary"
				>
					Create Playlist
				</button>
			</form>
		</div>
	);
};
