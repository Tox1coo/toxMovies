/* eslint-disable no-unused-vars */

import axios from 'axios'


export const search = {
	state: () => {
		return {
			SEARCH_URL: 'https://api.themoviedb.org/3/search/movie?api_key=',
		}
	}
}