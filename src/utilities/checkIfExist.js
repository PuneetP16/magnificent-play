export const isVideoInList = (currVideo, list) => {
	return list?.findIndex((video) => video._id === currVideo?._id) !== -1;
};
