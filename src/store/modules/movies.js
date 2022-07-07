/* eslint-disable no-unused-vars */

import axios from 'axios';


export const movies = {
	state: () => {
		return {
			API_KEY: 'd7083550b43318a344ca78678b536326',
			BASE_URL: 'https://api.themoviedb.org/3',
			IMAGE_URL: 'https://image.tmdb.org/t/p', // надо будет придумать как сделать загрузку определенного размера п.с. смотреть документацию в конфигурации
			SEARCH_URL: 'https://api.themoviedb.org/3/search/movie?api_key=',
			popularListFilms: [],
			genresList: [],
			popularListSerials: [],
			serial: null,
			film: null,
			rating: ''
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
		}
	},

	actions: {
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
					commit('updateRating', response.data.results[0].rating)
				})
				.catch(error => {
					console.log(error);
				})

		},
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
		}
	},

	namespaced: true
}