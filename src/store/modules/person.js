/* eslint-disable no-unused-vars */

import axios from "axios";


export const person = {
	state: () => {
		return {
			personInfo: [],
			API_KEY: 'd7083550b43318a344ca78678b536326',
			BASE_URL: 'https://api.themoviedb.org/3',
			IMAGE_URL: 'https://image.tmdb.org/t/p',
		}
	},

	mutations: {
		updatePerson(state, personInfo) {
			state.personInfo = personInfo;
		},
		updateCreditsPerson(state, personInfo) {
			state.creditsPerson = personInfo;
		},
		updateImagesList(state, imagesList) {
			state.imagesList = imagesList;
		}
	},

	actions: {
		async getPersonInfo({ commit, state }, id) {
			await axios.get(`${state.BASE_URL}/person/${id}?api_key=${state.API_KEY}`, {
				params: {
					language: 'ru',
					append_to_response: 'images,combined_credits'
				}
			}).then((response) => {
				commit('updatePerson', response.data)
			}).catch((error) => {
				console.log(error);
			})
		},

	},
	namespaced: true
}