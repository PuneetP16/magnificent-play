import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth, useVideo } from "../../contexts";
import { useAxios, useDocumentTitle } from "../../customHooks";
import "./SingleVideo.css";
import ReactPlayer from "react-player";
import { isVideoInList } from "../../utilities/checkIfExist";
import {
	getIndianDate,
	getVideoDuration,
} from "../../utilities/getFormattedData";
import { bxIcons } from "../../data/icons";
import { VideoListing } from "../../components";
export const SingleVideo = () => {
	useDocumentTitle("Single Video | MS");
	const { pathname } = useLocation();
	const { isAuth } = useAuth();
	const navigate = useNavigate();

	const { videoId } = useParams();

	const location = useLocation();
	const shouldPlay = location.state?.shouldPlay;
	const { axiosRequest } = useAxios();

	const {
		videoState: { videos, history, likes, watchlater },
		addToLikedVideos,
		removeFromLikedVideos,
		removeFromWatchLaterVideos,
		addToHistoryVideos,
		addToWatchLaterVideos,
		removeFromHistoryVideos,
	} = useVideo();

	const url = "https://www.youtube.com/watch?v=";

	const video = videos.find((video) => video._id === videoId);

	const isHistoryPage = pathname === "/history";

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

	const navigateToLogin = () => {
		if (!isAuth) navigate("/login");
	};

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

	const onPlayHandler = () => {
		addToHistoryVideos(axiosRequest, video);
	};

	const recommendedVideoList = videos.filter(
		(vid) =>
			vid.snippet.categoryId === video.snippet.categoryId &&
			vid._id !== video._id
	);

	return (
		<div className="home_page">
			<main className="main--homepage single_video_page">
				<section className="video__player_container">
					<section className="video__player">
						<ReactPlayer
							url={url + videoId}
							controls
							onPlay={onPlayHandler}
							playing={shouldPlay}
							width="100%"
							height="65vh"
						/>
					</section>
					<section className="video_player__body">
						<section className="video_player__text">
							<div className="video__details_bar">
								<h1 className="video_title" title={title}>
									{title}
								</h1>
								<section className="video_card__nav">
									<span className="video__duration">
										Duration: {getVideoDuration(duration)}
									</span>
									<div className="video_card__nav_items">
										<button
											className="btn btn--primary btn--icon btn--round"
											title={
												isVideoInList(video, likes)
													? "remove from like list"
													: "Like"
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
								</section>
							</div>
							<h2 className="video_channel__title">{channelTitle}</h2>
						</section>

						<section className="video_views_date">
							<div className="video_views">{viewCount} Views</div>
							<div className="video_date">{getIndianDate(publishedAt)}</div>
						</section>
						<div className="video__description">
							<span className="description_label">Description: </span>
							{description}
						</div>
					</section>
				</section>
				<section className="must_watch_container">
					<h3 className="h3 section__heading">Must Watch</h3>
					<ul className="video__items">
						<VideoListing list={recommendedVideoList} />
					</ul>
				</section>
			</main>
		</div>
	);
};
