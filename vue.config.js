module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/toxMovies/" : "/",
	css: {
		loaderOptions: {
			sass: {
				prependData: ' @import "@/assets/_variables.scss"; '
			}
		}
	}
};
// git subtree push --prefix dist origin gh-pages для загрузки на github pages