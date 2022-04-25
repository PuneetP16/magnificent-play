import { Link } from "react-router-dom";
import { bxIcons } from "../../../data/icons";
import "./VideoCard.css";

export const VideoCard = ({ video }) => {
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

	const getIndianDate = (isoDate) => {
		let dateObj = new Date(isoDate);
		return dateObj.toLocaleDateString("en-IN");
	};

	const getDuration = (str) => {
		let seconds = str
			.split("M")[1]
			.split("")
			.filter((number) => !isNaN(number));
		let minutes = str
			.split("M")[0]
			.split("")
			.filter((number) => !isNaN(number));
		if (seconds.length === 1) {
			seconds = "0" + seconds.join("");
		} else {
			seconds = seconds.join("");
		}

		if (minutes.length === 1) {
			minutes = "0" + minutes.join("");
		} else {
			minutes = minutes.join("");
		}

		return minutes + ":" + seconds;
	};
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
					<span className="video__duration">{getDuration(duration)}</span>
					<div className="video_card__nav_items">
						<button
							className="btn btn--primary btn--icon btn--round"
							title="Like"
						>
							{bxIcons.like}
							{/* bxIcons.liked */}
						</button>
						<button
							className="btn btn--primary btn--icon btn--round"
							title="Watch Later"
						>
							{bxIcons.watchLater}
							{/* {bxIcons.watchLaterSelected} */}
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
