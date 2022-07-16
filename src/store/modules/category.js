import axios from 'axios';

export const category = {
	state: () => {
		return {
			API_KEY: 'd7083550b43318a344ca78678b536326',
			BASE_URL: 'https://api.themoviedb.org/3',
			popularList: {
				tv: [],
				movie: []
			},
			trendingList: {
				tv: [],
				movie: []
			},
			topRatedList: {
				tv: [],
				movie: []
			},
			upComingList: {
				movie: []
			},
			nowPlayingList: {
				movie: []
			},
			onTheAirList: {
				tv: []
			},
			airingTodayList: {
				tv: []
			},
			totalPage: 0
		}
	},

	mutations: {
		updateTopRatedList(state, topRated) {
			topRated.list.forEach(element => {
				element.media_type = topRated.media
			});
			state.topRatedList[topRated.media] = [...state.topRatedList[topRated.media], ...topRated.list]
		},

		updatePopularList(state, popularList) {
			popularList.list.forEach(element => {
				element.media_type = popularList.media
			});
			state.popularList[popularList.media] = [...state.popularList[popularList.media], ...popularList.list]
		},
		updateTrendingList(state, trendingList) {
			trendingList.list.forEach(element => {
				element.media_type = trendingList.media
			});
			state.trendingList[trendingList.media] = [...state.trendingList[trendingList.media], ...trendingList.list]
		},
		updateUpComingList(state, upComingList) {

			upComingList.list.forEach(element => {
				element.media_type = upComingList.media
			});
			state.upComingList[upComingList.media] = [...state.upComingList[upComingList.media], ...upComingList.list]
		},
		updateNowPlayingList(state, nowPlayingList) {
			nowPlayingList.list.forEach(element => {
				element.media_type = nowPlayingList.media
			});
			state.nowPlayingList[nowPlayingList.media] = [...state.nowPlayingList[nowPlayingList.media], ...nowPlayingList.list]
		},
		updateOnTheAirList(state, onTheAirList) {
			onTheAirList.list.forEach(element => {
				element.media_type = onTheAirList.media
			});
			state.onTheAirList[onTheAirList.media] = [...state.onTheAirList[onTheAirList.media], ...onTheAirList.list]
		},
		updateAiringTodayList(state, airingTodayList) {
			airingTodayList.list.forEach(element => {
				element.media_type = airingTodayList.media
			});
			state.airingTodayList[airingTodayList.media] = [...state.airingTodayList[airingTodayList.media], ...airingTodayList.list]
		},
		updateTotalPage(state, totalPage) {
			state.totalPage = totalPage
		},
		clearList(state, list) {
			console.log(state[list.list]);
			state[list.list][list.media] = []
		}
	},

	actions: {
		// getPopularList
		async getPopularList({ commit, state }, config) {
			await axios.get(`${state.BASE_URL}/${config.media}/popular?api_key=${state.API_KEY}`, {
				params: {
					language: 'ru',
					region: config.region || 'ru',
					page: config.page || 1
				}
			})
				.then(response => {
					commit('updatePopularList', { list: response.data.results, media: config.media })
					commit('updateTotalPage', response.data.total_pages)

				})
				.catch(error => {
					console.log(error);
				})

		},

		// getTopRatedList
		async getTopRatedList({ commit, state }, config) {
			await axios.get(`${state.BASE_URL}/${config.media}/top_rated?api_key=${state.API_KEY}`, {
				params: {
					language: 'ru',
					region: config.region,
					page: config.page || 1
				}
			})
				.then(response => {
					commit('updateTopRatedList', { list: response.data.results, media: config.media })
					commit('updateTotalPage', response.data.total_pages)

				})
				.catch(error => {
					console.log(error);
				})
		},

		async getTrendingList({ commit, state }, config) {
			await axios.get(`${state.BASE_URL}/trending/${config.media}/${config.time}?api_key=${state.API_KEY}`, {
				params: {
					language: 'ru',
					page: config.page
				}
			})
				.then(response => {
					commit('updateTrendingList', { list: response.data.results, media: config.media })
					commit('updateTotalPage', response.data.total_pages)
				})
				.catch(error => {
					console.log(error);
				})
		},

		async getNowPlayingList({ commit, state }, config) {
			await axios.get(`${state.BASE_URL}/movie/now_playing?api_key=${state.API_KEY}`, {
				params: {
					language: 'ru',
					page: config.page,
					region: 'ru'
				}
			})
				.then(response => {
					commit('updateNowPlayingList', { list: response.data.results, media: config.media })
					commit('updateTotalPage', response.data.total_pages)
					console.log(response.data.results);


				})
				.catch(error => {
					console.log(error);
				})
		},
		async getUpComingList({ commit, state }, config) {
			await axios.get(`${state.BASE_URL}/movie/upcoming?api_key=${state.API_KEY}`, {
				params: {
					language: 'ru',
					page: config.page,
				}
			})
				.then(response => {
					console.log(response.data.results);
					commit('updateUpComingList', { list: response.data.results, media: config.media })
					commit('updateTotalPage', response.data.total_pages)
				})
				.catch(error => {
					console.log(error);
				})
		},

		async getOnTheAirList({ commit, state }, config) {
			await axios.get(`${state.BASE_URL}/tv/on_the_air?api_key=${state.API_KEY}`, {
				params: {
					language: 'ru',
					page: config.page,
				}
			})
				.then(response => {
					console.log(response.data.results);
					commit('updateOnTheAirList', { list: response.data.results, media: config.media })
					commit('updateTotalPage', response.data.total_pages)
				})
				.catch(error => {
					console.log(error);
				})
		},
		async getAiringTodayList({ commit, state }, config) {
			await axios.get(`${state.BASE_URL}/tv/airing_today?api_key=${state.API_KEY}`, {
				params: {
					language: 'ru',
					page: config.page,
				}
			})
				.then(response => {
					console.log(response.data.results);
					commit('updateAiringTodayList', { list: response.data.results, media: config.media })
					commit('updateTotalPage', response.data.total_pages)
				})
				.catch(error => {
					console.log(error);
				})
		}
	},
	namespaced: true,
}