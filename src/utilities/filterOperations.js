export const sortItByDate = (list, byLatest) => {
	if (byLatest === "unsort") return list;
	const data = [...list];

	const ascending = (a, b) => {
		return new Date(a.snippet.publishedAt) - new Date(b.snippet.publishedAt);
	};

	const descending = (a, b) => {
		return new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt);
	};

	return data.sort(byLatest ? descending : ascending);
};

export const filterByCategory = (list, category) => {
	if (category === "All") {
		return list;
	}
	return list.filter((video) => Number(video.snippet.categoryId) === category);
};

export const getSearchedVideos = (filteredList, query) => {
	if (!query) return filteredList;
	query = query.toLowerCase();
	return filteredList.filter((video) =>
		video.snippet.localized.title.toLowerCase().includes(query)
	);
};
