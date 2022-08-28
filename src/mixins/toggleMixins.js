export default {
	props: {
		show: {
			type: Boolean,
			default: false,
		},
	},
	created() {
		const that = this;
		document.addEventListener('keyup', function (event) {
			if (event.keyCode === 27 || event.key === 'Escape') {
				that.hideDialog()
			}
		});
	},
	methods: {
		hideDialog() {
			this.$emit("update:show", false);
		},
	},
};