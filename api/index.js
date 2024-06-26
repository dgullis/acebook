// docs: https://github.com/motdotla/dotenv#%EF%B8%8F-usage
require("dotenv").config();

const seedDatabase = require("./db/seeds.js");


const app = require("./app.js");
const { connectToDatabase } = require("./db/db.js");

const listenForRequests = () => {
	const port = process.env.PORT || 8080;
	app.listen(port, '0.0.0.0', () => {
		console.log("Now listening on port", port);	
});
}

connectToDatabase()
	// .then(() => seedDatabase())
	.then(() => {
		listenForRequests();
	})
