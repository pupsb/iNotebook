const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/inotebook";

const connectDB = () => {
	mongoose.connect(mongoURI, () => {
		console.log("Database connected");
	});
};

module.exports = connectDB;
