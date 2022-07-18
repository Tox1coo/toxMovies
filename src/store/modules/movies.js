/* eslint-disable no-unused-vars */

import axios from 'axios';


export const movies = {
	state: () => {
		return {
			IMAGE_URL: 'https://image.tmdb.org/t/p',
			showTrailer: false,
		}
	},
	namespaced: true
}