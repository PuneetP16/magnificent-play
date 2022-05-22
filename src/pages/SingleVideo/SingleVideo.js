import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { Modal, VideoListing } from "../../components";
import { PlaylistPanel } from "../../components/PlaylistPanel/PlaylistPanel";
import { useHandler } from "../../customHooks/useHandler";
import { useSelector } from "react-redux";

export const SingleVideo = () => {
	useDocumentTitle("Single Video | MS");
	const { pathname } = useLocation();
	const { isAuth } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const { videoId } = useParams();
	const { axiosRequest } = useAxios();
	const [singleVideo, setSingleVideo] = useState();

	useEffect(() => {
		(async () => {
			const videoURL = `/api/video/${videoId}`;
			const { output } = await axiosRequest({
				method: "GET",
				url: videoURL,
				resKey: "video",
			});

			setSingleVideo(output);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [videoId]);

	const location = useLocation();
	const shouldPlay = location.state?.shouldPlay;

	const { videos, watchLater, likes } = useSelector((state) => state.videos);

	const {
		addToLikedVideos,
		removeFromLikedVideos,
		removeFromWatchLaterVideos,
		addToHistoryVideos,
		addToWatchLaterVideos,
	} = useHandler();

	const url = "https://www.youtube.com/watch?v=";

	const duration = singleVideo?.contentDetails?.duration;
	const description = singleVideo?.snippet?.description;
	const channelTitle = singleVideo?.snippet?.channelTitle;
	const publishedAt = singleVideo?.snippet?.publishedAt;
	const title = singleVideo?.snippet?.localized.title;
	const viewCount = singleVideo?.statistics?.viewCount;

	const getLikeBtn = (() => {
		if (pathname === "/like") {
			return bxIcons.likedThumb;
		}
		return isVideoInList(singleVideo, likes)
			? bxIcons.likedThumb
			: bxIcons.like;
	})();

	const getWatchLaterBtn = (() => {
		if (pathname === "/watchlater") return bxIcons.watchLaterSelected;
		return isVideoInList(singleVideo, watchLater)
			? bxIcons.watchLaterSelected
			: bxIcons.watchLater;
	})();

	const toggleLikedVideo = () => {
		if (!isAuth) return navigate("/login");
		isVideoInList(singleVideo, likes)
			? removeFromLikedVideos(axiosRequest, singleVideo)
			: addToLikedVideos(axiosRequest, singleVideo);
	};

	const toggleWatchLaterVideo = () => {
		if (!isAuth) return navigate("/login");
		isVideoInList(singleVideo, watchLater)
			? removeFromWatchLaterVideos(axiosRequest, singleVideo)
			: addToWatchLaterVideos(axiosRequest, singleVideo);
	};

	const onPlayHandler = () => {
		addToHistoryVideos(axiosRequest, singleVideo);
	};

	const recommendedVideoList = videos.filter(
		(vid) =>
			vid.snippet.categoryId === singleVideo?.snippet?.categoryId &&
			vid._id !== singleVideo?._id
	);

	const [showPlaylist, setShowPlaylist] = useState(false);

	const togglePlaylistPanel = () => {
		if (!isAuth) return navigate("/login");
		setShowPlaylist((v) => !v);
	};

	return singleVideo ? (
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
												isVideoInList(singleVideo, likes)
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
												isVideoInList(singleVideo, watchLater)
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
				{showPlaylist ? (
					<Modal setModalVisibility={setShowPlaylist}>
						<PlaylistPanel
							showPlaylist={showPlaylist}
							togglePlaylistPanel={togglePlaylistPanel}
							video={singleVideo}
						/>
					</Modal>
				) : null}
			</main>
		</div>
	) : null;
};
