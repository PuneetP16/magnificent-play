import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth, useVideo } from "../../../contexts";
import { useAxios } from "../../../customHooks";
import { bxIcons } from "../../../data/icons";
import { isVideoInList } from "../../../utilities/checkIfExist";
import {
	getIndianDate,
	getVideoDuration,
} from "../../../utilities/getFormattedData";
import "./VideoCard.css";
import { PlaylistPanel } from "../../PlaylistPanel/PlaylistPanel";
import { Modal } from "../../UI/Modal/Modal";

export const VideoCard = ({ video }) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const {
		videoState: { likes, watchlater },
		addToLikedVideos,
		removeFromLikedVideos,
		removeFromWatchLaterVideos,
		addToWatchLaterVideos,
		removeFromHistoryVideos,
	} = useVideo();

	const _id = video?._id;
	const duration = video?.contentDetails?.duration;
	const channelTitle = video?.snippet?.channelTitle;
	const publishedAt = video?.snippet?.publishedAt;
	const title = video?.snippet?.localized.title;
	const viewCount = video?.statistics?.viewCount;
	const thumbnailURL = video?.snippet?.thumbnails?.high?.url;

	const { axiosRequest } = useAxios();
	const { isAuth } = useAuth();

	const isHistoryPage = pathname === "/history";

	const toggleLikedVideo = () => {
		console.log(video, likes);
		if (!isAuth) return navigate("/login");
		isVideoInList(video, likes)
			? removeFromLikedVideos(axiosRequest, video)
			: addToLikedVideos(axiosRequest, video);
	};

	const toggleWatchLaterVideo = () => {
		if (!isAuth) return navigate("/login");
		isVideoInList(video, watchlater)
			? removeFromWatchLaterVideos(axiosRequest, video)
			: addToWatchLaterVideos(axiosRequest, video);
	};
	useEffect(() => {
		console.log({ video, likes, _id });
	}, [likes]);

	const getLikeBtn = (() => {
		if (pathname === "/like") {
			return bxIcons.likedThumb;
		}
		return isVideoInList(video, likes) ? bxIcons.likedThumb : bxIcons.like;
	})();

	const getWatchLaterBtn = (() => {
		if (pathname === "/watchlater") return bxIcons.watchLaterSelected;
		return isVideoInList(video, watchlater)
			? bxIcons.watchLaterSelected
			: bxIcons.watchLater;
	})();

	const [showPlaylist, setShowPlaylist] = useState(false);

	const togglePlaylistPanel = () => {
		if (!isAuth) return navigate("/login");
		setShowPlaylist((v) => !v);
	};

	return (
		<article className="categories__list video_card ">
			<section className="video_card__header">
				<Link to={`/explore/${_id}`}>
					<img
						className="video_card__thumbnail image--responsive"
						src={thumbnailURL}
						alt={title}
					/>
				</Link>
			</section>
			<section className="video_card__body">
				<div className="video_card__nav">
					<span className="video__duration">{getVideoDuration(duration)}</span>
					<div className="video_card__nav_items">
						<button
							className="btn btn--primary btn--icon btn--round"
							title={
								isVideoInList(video, likes) ? "remove from like list" : "Like"
							}
							onClick={toggleLikedVideo}
						>
							{getLikeBtn}
						</button>
						<button
							className="btn btn--primary btn--icon btn--round"
							title={
								isVideoInList(video, watchlater)
									? "remove from watch later"
									: "Watch Later"
							}
							onClick={toggleWatchLaterVideo}
						>
							{getWatchLaterBtn}
						</button>

						<button
							className="btn btn--primary btn--icon btn--round playlist_icon"
							title="Playlist"
							onClick={togglePlaylistPanel}
						>
							{bxIcons.playlist}
						</button>
					</div>
				</div>
				<section className="video_card__text">
					<h1 className="video_title" title={title}>
						{title}
					</h1>
					<h2 className="video_channel__title">{channelTitle}</h2>
				</section>
				<section className="video_views_date">
					<div className="video_views">{viewCount} Views</div>
					<div className="video_date">{getIndianDate(publishedAt)}</div>
				</section>
				<section className="video_card__cta">
					<Link to={`/explore/${_id}`} state={{ shouldPlay: true }}>
						<button className="btn btn--primary">Watch Now</button>
					</Link>
				</section>
				{isHistoryPage ? (
					<div
						className="card__dismiss dark btn btn--icon btn--close--transparent alert--btn__dismiss btn--circular"
						title="remove from Watch History"
						onClick={() => removeFromHistoryVideos(axiosRequest, video)}
					>
						{bxIcons.cross}
					</div>
				) : null}
			</section>
			{showPlaylist ? (
				<Modal setModalVisibility={setShowPlaylist}>
					<PlaylistPanel
						showPlaylist={showPlaylist}
						togglePlaylistPanel={togglePlaylistPanel}
						video={video}
					/>
				</Modal>
			) : null}
		</article>
	);
};
