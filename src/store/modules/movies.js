/* eslint-disable no-unused-vars */

import axios from 'axios';


export const movies = {
	state: () => {
		return {
			IMAGE_URL: 'https://image.tmdb.org/t/p',
			showTrailer: false,
			isLoading: false,
			error: 'This page could not be found'
		}
	},

	mutations: {
		isShowTrailer(state, showTrailer) {
			state.showTrailer = showTrailer;
		},
		setIsLoading(state, isLoading) {
			state.isLoading = isLoading
		},
		updateError(state, error) {
			state.error = error;
		}
	},
	namespaced: true
}
// исправить ошибку с isShowTrailer