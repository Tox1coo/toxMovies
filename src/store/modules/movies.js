/* eslint-disable no-unused-vars */

import axios from 'axios';


export const movies = {
	state: () => {
		return {
			API_KEY: 'd7083550b43318a344ca78678b536326',
			BASE_URL: 'https://api.themoviedb.org/3',
			IMAGE_URL: 'https://image.tmdb.org/t/p/', // надо будет придумать как сделать загрузку определенного размера п.с. смотреть документацию в конфигурации
			SEARCH_URL: 'https://api.themoviedb.org/3/search/movie?api_key=',
			popularListFilms: [],
			genresList: []
		}
	},

	mutations: {
		updateGenresList(state, genresList) {
			state.genresList = genresList
		}
	},

	actions: {
		async getPopularList({ commit, state }, region) {
			console.log(region);
			axios.get(`${state.BASE_URL}/movie/popular?api_key=${state.API_KEY}`, {
				params: {
					language: 'ru',
					region: region
				}
			})
				.then(response => {
					console.log(response.data);
				})
				.catch(error => {
					console.log(error);
				})
			// сделать запрос на сериалы
		},
		async getGenresMovies({ commit, state }) {
			await axios.get(`${state.BASE_URL}/genre/movie/list?api_key=${state.API_KEY}`, {
				params: {
					language: 'ru'
				}
			})
				.then((response) => {
					console.log(response.data);
				})
				.catch((error) => {
					console.log(error);
				})
		}
	},

	namespaced: true
}