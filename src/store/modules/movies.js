/* eslint-disable no-unused-vars */

import axios from 'axios';


export const movies = {
	state: () => {
		return {
			IMAGE_URL: 'https://image.tmdb.org/t/p',
			showTrailer: false,
		}
	},

	mutations: {
		isShowTrailer(state, showTrailer) {
			state.showTrailer = showTrailer;
		}
	},
	namespaced: true
}