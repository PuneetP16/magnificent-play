import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useVideo } from "../../../contexts";
import { useAxios } from "../../../customHooks";
import "./PlaylistCard.css";
import { bxIcons } from "../../../data/icons";

export const PlaylistCard = ({ playlist }) => {
	const { videoDispatch, getPlaylist, playlists, removeFromPlaylists } =
		useVideo();
	const { axiosRequest } = useAxios();

	return (
		<li
			key={playlist._id}
			className="categories__list category_card__list playlist__card"
		>
			<Link
				to={`/playlists/${playlist._id}`}
				// onClick={getPlaylistHandler}
				className="categories__links "
			>
				<div className="category_card">
					<span className="catergories__name">{playlist.title}</span>
				</div>
			</Link>
			<div
				className="card__dismiss dark btn btn--icon btn--close--transparent alert--btn__dismiss btn--circular"
				title="remove playlist"
				onClick={() => removeFromPlaylists(axiosRequest, playlist)}
			>
				{bxIcons.cross}
			</div>
		</li>
	);
};
