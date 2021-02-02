
const fs = require("fs");
const { routes } = require("./user");


module.exports = (app) => {
	fs.readdirSync(__dirname).forEach((file) => {
		if (file !== "index.js") {
			const router = require(`./${file}`);
		app.use(router.routes())
		}
	});
};
