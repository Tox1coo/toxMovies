/* eslint-disable no-unused-vars */

import axios from 'axios';


export const movies = {
	state: () => {
		return {
			API_KEY: 'd7083550b43318a344ca78678b536326',
			BASE_URL: 'https://api.themoviedb.org/3',
			IMAGE_URL: 'https://image.tmdb.org/t/p',
			SEARCH_URL: 'https://api.themoviedb.org/3/search/movie?api_key=',
			popularListFilms: [],
			genresList: [],
			popularListSerials: [],
			serial: null,
			film: null,
			rating: '',
			trendingMovieList: [],
			trendingTVList: [],
			showTrailer: false,
			videoLists: [],
			trailerKey: ''
		}
	},

	mutations: {
		updateGenresList(state, genresList) {
			state.genresList = genresList
		},
		updatePopularListFilms(state, popularListFilms) {
			state.popularListFilms = popularListFilms
		},
		updatePopularListSerials(state, popularListSerials) {
			state.popularListSerials = popularListSerials
		},
		updateSerial(state, serial) {
			state.serial = serial
		},
		updateFilm(state, film) {
			state.film = film
		},
		updateRating(state, rating) {
			state.rating = rating;
		},
		updateTrendingMovieList(state, trendingMovieList) {
			state.trendingMovieList = state.trendingMovieList.concat(trendingMovieList)
		},
		updateTrendingTVList(state, trendingTVList) {
			state.trendingTVList = state.trendingTVList.concat(trendingTVList)
		},
		isShowTrailer(state, showTrailer) {
			state.showTrailer = showTrailer
		},

		setTrailer(state, videoList) {
			state.videoLists = videoList;
			const indexTrailer = videoList.findIndex((video) => video.type === 'Trailer');
			console.log(indexTrailer);
			if (indexTrailer !== -1) {
				state.trailerKey = videoList[indexTrailer].key;
			} else if (videoList.length > 0) {
				state.trailerKey = videoList[0].key;
			}

		}
	},

	actions: {
		// popularList
		async getPopularList({ commit, state }, config) {
			console.log(config.region);
			axios.get(`${state.BASE_URL}/movie/popular?api_key=${state.API_KEY}`, {
				params: {
					language: 'ru',
					region: config.region,
					page: config.page || 1
				}
			})
				.then(response => {
					commit('updatePopularListFilms', response.data)
				})
				.catch(error => {
					console.log(error);
				})
			axios.get(`${state.BASE_URL}/tv/popular?api_key=${state.API_KEY}`, {
				params: {
					language: 'ru',
					region: config.region,
					page: config.page || 1
				}
			})
				.then(response => {
					commit('updatePopularListSerials', response.data)
				})
				.catch(error => {
					console.log(error);
				})
		},

		// genresList
		async getGenresMovies({ commit, state }) {
			await axios.get(`${state.BASE_URL}/genre/movie/list?api_key=${state.API_KEY}`, {
				params: {
					language: 'ru'
				}
			})
				.then((response) => {
					commit('updateGenresList', response.data)
				})
				.catch((error) => {
					console.log(error);
				})
		},

		// getSerials
		async getSerials({ commit, state }, id) {
			await axios.get(`${state.BASE_URL}/tv/${id}?api_key=${state.API_KEY}`, {
				params: {
					language: 'ru',
				}
			})
				.then(response => {
					commit('updateSerial', response.data)
					commit('updateFilm', null)

				})
				.catch(error => {
					console.log(error);
				})
			await axios.get(`${state.BASE_URL}/tv/${id}/content_ratings?api_key=${state.API_KEY}`
			)
				.then(response => {
					commit('updateRating', response.data.results[0]?.rating)
				})
				.catch(error => {
					console.log(error);
				})

		},

		// getFilms
		async getFilm({ commit, state }, id) {
			axios.get(`${state.BASE_URL}/movie/${id}?api_key=${state.API_KEY}`, {
				params: {
					language: 'ru',
				}
			})
				.then(response => {
					commit('updateFilm', response.data)
					commit('updateSerial', null)
				})
				.catch(error => {
					console.log(error);
				})
		},

		// getTrendingList
		async getTrendingList({ commit, state }, config) {
			await axios.get(`${state.BASE_URL}/trending/${config.type}/${config.time}?api_key=${state.API_KEY}`, {
				params: {
					language: 'ru',
					page: config.page
				}
			})
				.then(response => {
					console.log(config.type);
					if (config.type === 'movie') {
						commit('updateTrendingMovieList', response.data.results)

					} else if (config.type === 'tv') {
						commit('updateTrendingTVList', response.data.results)

					}
				})
				.catch(error => {
					console.log(error);
				})
		},

		// getTrailerVideoList
		async getTrailerVideoList({ commit, state }, config) {
			console.log(config);
			await axios.get(`${state.BASE_URL}/${config.media_type}/${config.id}/videos?api_key=${state.API_KEY}`).then((response) => {
				commit('setTrailer', response.data.results)
			}).catch((error) => {
				console.log(error);
			});
		}
	},

	namespaced: true
}