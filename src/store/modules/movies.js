/* eslint-disable no-unused-vars */

import axios from 'axios';


export const movies = {
	state: () => {
		return {
			API_KEY: 'd7083550b43318a344ca78678b536326',
			BASE_URL: 'https://api.themoviedb.org/3',
			IMAGE_URL: 'https://image.tmdb.org/t/p',
			genresList: [],
			serial: null,
			film: null,
			rating: '',
			showTrailer: false,
			videoLists: [],
			trailerKey: '',
			creditsItem: {},
			similarList: [],
			imagesList: [],
			selectedSort: 'All',
			seasonInfo: [],
			isLoading: false,
		}
	},

	mutations: {
		updateSelectedSort(state, selectedSort) {
			state.selectedSort = selectedSort
		},
		updateGenresList(state, genresList) {
			state.genresList = genresList
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
		},

		setCreditsItem(state, creditsItem) {
			state.creditsItem = creditsItem;
		},

		setImagesList(state, imagesList) {
			delete imagesList.id
			state.imagesList = imagesList;
		},

		setSimilarList(state, similarList) {
			if (state?.serial != null) {
				state.similarList = similarList.filter(similar => similar.id !== state.serial?.id);

			} else {
				state.similarList = similarList.filter(similar => similar.id !== state.film?.id);

			}
		},

		setSeasonInfo(state, seasonInfo) {
			if (!state.seasonInfo.includes(seasonInfo.id)) {
				state.seasonInfo.push(seasonInfo)
			}
		},

		setIsLoading(state, isLoading) {
			state.isLoading = isLoading
		},

		clearSeasonInfo(state) {
			state.seasonInfo = []
		}
	},
	getters: {
		sortedVideos(state) {
			return [...state.videoLists].filter(video => {
				if (state.selectedSort === 'All') {
					return state.videoLists
				} else {
					return video.type === state.selectedSort
				}
			})
		},

	},
	actions: {


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
					commit('updateRating', '')
				})
				.catch(error => {
					console.log(error);
				})
		},



		// getTrailerVideoList
		async getTrailerVideoList({ commit, state }, config) {
			await axios.get(`${state.BASE_URL}/${config.media_type}/${config.id}/videos?api_key=${state.API_KEY}`).then((response) => {
				commit('setTrailer', response.data.results)
			}).catch((error) => {
				console.log(error);
			});
		},

		// getCreditsInfo
		async getCreditsInfo({ commit, state }, config) {
			await axios.get(`${state.BASE_URL}/${config.media_type}/${config.id}/credits?api_key=${state.API_KEY}`).then((response) => {
				commit('setCreditsItem', response.data)
			}).catch((error) => {
				console.log(error);
			})
		},

		// getSimilar
		async getSimilar({ commit, state }, config) {
			await axios.get(`${state.BASE_URL}/${config.media_type}/${config.id}/similar?api_key=${state.API_KEY}`, {
				params: {
					language: 'ru'
				}
			}).then((response) => {
				commit('setSimilarList', response.data.results)
			}).catch((error) => {
				console.log(error);
			})
		},

		// getImages
		async getImages({ commit, state }, config) {
			await axios.get(`${state.BASE_URL}/${config.media_type}/${config.id}/images?api_key=${state.API_KEY}`, {
				params: {
					language: 'en'
				}
			}
			).then((response) => {
				console.log(response.data);
				commit('setImagesList', response.data)
			}).catch((error) => {
				console.log(error);
			});
		},

		// getSeasonsInfo
		async getSeasonsInfo({ commit, state }) {
			console.log(state.serial.id);
			const serialSeasons = state.serial.number_of_seasons
			commit('clearSeasonInfo')

			for (let index = 0; index < serialSeasons; index++) {
				await axios.get(`${state.BASE_URL}/tv/${state.serial.id}/season/${index + 1}?api_key=${state.API_KEY}`,
					{
						params: {
							language: 'ru'
						}
					}).then((response) => {

						commit('setSeasonInfo', response.data)
					}).catch(error => {
						console.log(error);
					})
			}
		}
	},
	namespaced: true
}