/* eslint-disable no-unused-vars */
import axios from 'axios'
export const geo = {
	state: () => {
		return {
			region: '',
		}
	},

	mutations: {
		setRegionUser(state, region) {
			state.region = region
		}
	},

	actions: {
		async getGeolocation({ commit }) {
			try {
				const geo = await axios.get('https://api.sypexgeo.net/json')
				const region = (geo.data.region.iso.length > 2) ? geo.data.region.iso.match(/\D\D/).toString().toLowerCase() : geo.data.region.iso
				console.log(region);
				commit('setRegionUser', region)
			} catch (error) {
				console.log(error);
			}
		}
	},
	namespaced: true
}