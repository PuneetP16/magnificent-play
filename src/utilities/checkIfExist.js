export const isVideoInList = (currVideo, list) =>
	list.findIndex((video) => video._id === currVideo._id) !== -1;
