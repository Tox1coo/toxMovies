/* eslint-disable no-unused-vars */
import axios from "axios"
const API_KEY = 'd7083550b43318a344ca78678b536326';
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_URL = 'https://image.tmdb.org/t/p';


const lists = {
	movie: [
		{ title: 'Trendings Movies', query: 'trending' },
		{ title: 'Popular Movies', query: 'popular' },
		{ title: 'Top Rated Movies', query: 'top_rated' },
		{ title: 'Upcoming Movies', query: 'upcoming' },
		{ title: 'Now Playing Movies', query: 'now_playing' },
	],
	tv: [
		{ title: 'Trendings TVShows', query: 'trending' },
		{ title: 'Popular TVShows', query: 'popular' },
		{ title: 'Top Rated TVShows', query: 'top_rated' },
		{ title: 'Currently Airing TV Shows', query: 'on_the_air' },
		{ title: 'TV Shows Airing Today', query: 'airing_today' },
	],
};

export function getMovies(query, page = 1) {
	return new Promise((resolve, reject) => {
		axios.get(`${BASE_URL}/movie/${query}`, {
			params: {
				api_key: API_KEY,
				language: 'en',
				page,
			},
		}).then((response) => {
			resolve(response.data);
		}).catch((error) => {
			reject(error);
		});
	});
};

export function getMovie(id) {
	return new Promise((resolve, reject) => {
		axios.get(`${BASE_URL}/movie/${id}`, {
			params: {
				api_key: API_KEY,
				language: 'en',
				append_to_response: 'videos,images,credits,external_ids,similar'
			},
		}).then((response) => {
			resolve(response.data);
		}).catch((error) => {
			reject(error);
		});
	});
};

export function getTrending(media, page = 1) {
	return new Promise((resolve, reject) => {
		axios.get(`${BASE_URL}/trending/${media}/week`, {
			params: {
				api_key: API_KEY,
				language: 'en',
				page
			},
		}).then((response) => {
			resolve(response.data);
		}).catch((error) => {
			reject(error);
		});
	});
};

export function getTVShow(id) {
	return new Promise((resolve, reject) => {
		axios.get(`${BASE_URL}/tv/${id}`, {
			params: {
				api_key: API_KEY,
				language: 'en',
				append_to_response: 'videos,images,credits,external_ids,similar,content_ratings'

			},
		}).then((response) => {
			resolve(response.data);
		}).catch((error) => {
			reject(error);
		});
	});
};

export function getTVShows(query, page = 1) {
	return new Promise((resolve, reject) => {
		axios.get(`${BASE_URL}/tv/${query}`, {
			params: {
				api_key: API_KEY,
				language: 'en',
				page
			},
		}).then((response) => {
			resolve(response.data);
		}).catch((error) => {
			reject(error);
		});
	});
};

export function getLists(media, query) {
	if (media === 'movie') {
		return lists.movie.find(list => list.query === query)
	} else {
		return lists.tv.find(list => list.query === query)
	}
}

export function getTrailer(item) {
	const videoList = item.videos.results;
	const indexTrailer = videoList.findIndex(
		(video) => video.type === "Trailer"
	);
	let trailerKey;
	let url;
	let error = false
	if (indexTrailer !== -1) {
		trailerKey = videoList[indexTrailer].key;
		url = `https://www.youtube.com/embed/${trailerKey}?autoplay=1`
	} else if (videoList.length > 1) {
		trailerKey = videoList[0].key;
		url = `https://www.youtube.com/embed/${trailerKey}?autoplay=1`
	} else {
		error = true
	}
	return { url, error }
}

export function sortedVideos(list, sorted) {
	if (sorted === 'All') return list
	return list.filter(video => video.type === sorted)
}

export function getEpisodesTVShows(id, season_number = 1) {
	return new Promise((resolve, reject) => {
		axios.get(`${BASE_URL}/tv/${id}/season/${season_number}`, {
			params: {
				api_key: API_KEY,
				language: 'en'
			}
		}).then((response) => {
			resolve(response.data)
		}).catch((error) => {
			reject(error)
		})
	})
}

export function getGenreList(media) {
	return new Promise((resolve, reject) => {
		axios.get(`${BASE_URL}/genre/${media}/list`, {
			params: {
				api_key: API_KEY,
				language: 'en'
			}
		}).then((response) => {
			resolve(response.data)
		}).catch((error) => {
			reject(error)
		})
	})
}

export function getMediaByGenre(media, id, page = 1) {
	return new Promise((resolve, reject) => {
		axios.get(`${BASE_URL}/discover/${media}`, {
			params: {
				api_key: API_KEY,
				language: 'en',
				with_genres: id,
				page,
			},
		}).then((response) => {
			resolve(response.data);
		})
			.catch((error) => {
				reject(error);
			});
	});
}


export function getPersonInfo(id) {
	return new Promise((resolve, reject) => {
		axios.get(`${BASE_URL}/person/${id}`, {
			params: {
				api_key: API_KEY,
				language: 'en',
				append_to_response: 'images,combined_credits,external_ids'
			}
		}).then((response) => {
			resolve(response.data)
		}).catch((error) => {
			reject(error)
		})
	})
}

export function getList(typeList, typeMedia, list) {
	if (typeList === 'All' && typeMedia === 'All') return list
	let listItem;
	if (typeList === 'Acting' || typeList === 'All') {
		listItem = list.filter(listItem => {
			if (typeMedia === "All") {
				return listItem?.department === undefined
			} else if (typeMedia === "Movies") {
				return listItem.media_type === 'movie' && listItem.department === undefined
			} else {
				return listItem.media_type === 'tv' && listItem.department === undefined
			}
		})
	} else {
		listItem = list.filter(listItem => {
			if (typeMedia === "All") {
				return listItem.department === typeList
			} else if (typeMedia === "Movies") {
				return listItem.media_type === 'movie' && listItem.department === typeList
			} else {
				return listItem.media_type === 'tv' && listItem.department === typeList
			}
		})
	}
	return listItem
}


export function getSearch(query, page = 1) {
	return new Promise((resolve, reject) => {
		axios.get(`${BASE_URL}/search/multi`, {
			params: {
				api_key: API_KEY,
				language: 'en',
				query: query,
				page
			}
		}).then((response) => {
			resolve(response.data)
		}).catch((error) => {
			reject(error)
		})
	})
}