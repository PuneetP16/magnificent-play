export const getIndianDate = (isoDate) => {
	let dateObj = new Date(isoDate);
	return dateObj.toLocaleDateString("en-IN");
};

export const getVideoDuration = (str) => {
	let seconds = str
		?.split("M")[1]
		?.split("")
		?.filter((number) => !isNaN(number));
	let minutes = str
		?.split("M")[0]
		?.split("")
		?.filter((number) => !isNaN(number));
	if (seconds?.length === 1) {
		seconds = "0" + seconds.join("");
	} else {
		seconds = seconds?.join("");
	}

	if (minutes?.length === 1) {
		minutes = "0" + minutes?.join("");
	} else {
		minutes = minutes?.join("");
	}

	return minutes + ":" + seconds;
};
