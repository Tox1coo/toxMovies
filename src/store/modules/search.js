/* eslint-disable no-unused-vars */

import axios from 'axios'


export const search = {
	state: () => {
		return {
			showSearch: false,
			SEARCH_URL: 'https://api.themoviedb.org/3/search/movie?api_key=',
			search: ''
		}
	},

	mutations: {
		updateSearch(state, search) {
			state.search = search
		},
		updateShowSearch(state, showSearch) {
			state.showSearch = showSearch
		}
	},
	namespaced: true
}