const mongoose = require("mongoose");

const root = "/images/";

const NotificationSchema = new mongoose.Schema(
	{
		message: String
	}, {timestamp: true}
)


const UserSchema = new mongoose.Schema(
	{
		username: { type: String, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true }, // consider validation options within schema
		bio: String,
		image: {
			type: String,
			get: (v) => `${root}${v}`, // possible solution but requires image hosting server
		},
		// stores ObjectIds of documents in 'User' collection
		// when retrieving a User look to use populate() function to retrieve full documents of friends
		friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
		notifications: [NotificationSchema]
	},
	{ timestamp: true, toJSON: { getters: true } }
);

const User = mongoose.model("User", UserSchema);
const Notification = mongoose.model("Notification", NotificationSchema);

// creates new users for testing purposes
// TODO: Users are adding to DB with same usernames ?uniqueness not working. ?need to check data exists before seedsing.

// new User({
//     username: "test_user1",
//     email: "test1@test.com",
//     password: "Si!1234567",
//     bio: "test bio1",
//     posts: [],
//     friends: ["65b8e7e82c3b14ab340c6754"],
// }).save();

// new User({
//     username: "test_user2",
//     email: "test2@test.com",
//     password: "Da!1234567",
//     bio: "test bio2",
//     posts: [],
// }).save();


module.exports = User;
