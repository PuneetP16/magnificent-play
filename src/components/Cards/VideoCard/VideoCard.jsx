import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth, useVideo } from "../../../contexts";
import { useAxios } from "../../../customHooks";
import { bxIcons } from "../../../data/icons";
import { isVideoInList } from "../../../utilities/checkIfExist";
import {
	getIndianDate,
	getVideoDuration,
} from "../../../utilities/getFormattedData";
import "./VideoCard.css";

export const VideoCard = ({ video }) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const {
		videoState: { likes, watchlater },
		addToLikedVideos,
		removeFromLikedVideos,
		removeFromWatchLaterVideos,
		addToWatchLaterVideos,
	} = useVideo();

	const {
		_id,
		contentDetails: { duration },
		snippet: {
			categoryId,
			channelId,
			channelTitle,
			description,
			localized: { title },
			publishedAt,
			tags,
			thumbnails: {
				high: { url: thumbnailURL },
			},
		},
		statistics: { viewCount },
	} = video;

	const { axiosRequest } = useAxios();
	const { isAuth } = useAuth();

	const navigateToLogin = () => {
		if (!isAuth) navigate("/login");
	};

	console.log({
		_id,
		title,
		description,
		categoryId,
		channelId,
		channelTitle,
		publishedAt,
		tags,
		thumbnailURL,
		viewCount,
	});

	const toggleLikedVideo = () => {
		navigateToLogin();
		isVideoInList(video, likes)
			? removeFromLikedVideos(axiosRequest, video)
			: addToLikedVideos(axiosRequest, video);
	};
	const toggleWatchLaterVideo = () => {
		navigateToLogin();
		isVideoInList(video, watchlater)
			? removeFromWatchLaterVideos(axiosRequest, video)
			: addToWatchLaterVideos(axiosRequest, video);
	};

	const getLikeBtn = (() => {
		if (pathname === "/like") return bxIcons.likedThumb;
		return isVideoInList(video, likes) ? bxIcons.likedThumb : bxIcons.like;
	})();

	const getWatchLaterBtn = (() => {
		if (pathname === "/watchlater") return bxIcons.watchLaterSelected;
		return isVideoInList(video, watchlater)
			? bxIcons.watchLaterSelected
			: bxIcons.watchLater;
	})();

	return (
		<article className="categories__list video_card ">
			<section className="video_card__header">
				<Link to="/">
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
							className="btn btn--primary btn--icon btn--round"
							title="Playlist"
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
					<button className="btn btn--primary">Watch Now</button>
				</section>
			</section>
		</article>
	);
};
