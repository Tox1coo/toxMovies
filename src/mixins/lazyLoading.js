export default {
	data() {
		return {
			visibleItem: 10
		}
	},
	methods: {
		loadMore() {
			this.visibleItem += 10;
		},
	}
}