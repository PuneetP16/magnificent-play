import { VideoCard } from "../Cards/VideoCard/VideoCard";

export const VideoListing = ({ list }) => {
	return list?.length > 0
		? list?.map((video) => {
				return <VideoCard key={video._id} video={video} />;
		  })
		: null;
}; 
