const User = require("../models/user");
const crypto = require("crypto");
const { generateToken } = require("../lib/token");

function checkPassword(str) {
	var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
	return re.test(str);
}

function checkEmail(str) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(str);
}

const create = async (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const defaultUserImage = req.body.defaultUserImage;

	if (!password || !username || !email) {
		return res.status(400).json({ message: "All fields required" });
	}

	if (!checkPassword(password)) {
		return res.status(400).json({
			message:
				"Password requirements not met",
		});
	}
	if (!checkEmail(email)) {
		return res.status(400).json({
			message: "invalid email address.",
		});
	}

	try {
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(409).json({ message: "Username already exists. Please choose another or login" });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });	}
	
	try {
		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(409).json({ message: "Email already exists. Please choose another or login" });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });	}

	// Hash the password
	const hashedPassword = crypto
		.createHash("sha256")
		.update(password)
		.digest("hex");

	const user = new User({ username, email, password: hashedPassword, image: defaultUserImage });
	user
		.save()
		.then((user) => {
			res.status(201).json({ message: "OK" });
		})
		.catch((err) => {
			console.error(err);
			res.status(400).json({ message: "Something went wrong" });
		});
};

const getUser = async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({
        username: username
    }).populate({
		path:'friends',
		model: 'User'
	}).populate({
		path: "posts",
		model: "Post",
		populate: {
			path:'comments',
			model: 'Comment',
			populate: {
				path: 'user',
				model: "User"
			}
		}})
		.populate({
			path: "posts",
			model: "Post",
			populate: {
				path: "postedBy",
				model: 'User'
			}
		})
		.populate({
			path: "notifications",
			model: "Notification"
		})
    if(!user) {
        return res.status(400).json({ message: "User not found" });
    }  
    const token = generateToken(req.user_id);
    res.status(200).json({ user: user, token: token });
    
}

const searchUsers = async (req, res) => {
	const searchQuery = req.query.search;
	const regex = new RegExp(searchQuery, 'i')


	try {
	const results = await User.find({username: {$regex: regex}})
	if(!results || results.length === 0) {
        return res.status(404).json({ message: "no user found" });
    }  
    return res.status(200).json({ result: results} );
	} catch (error) {
		return res.status(500).json({ message: "internal server error "})
	}

}


const uploadImage = async (req, res) => {
	const username = req.params.username;
	const imageURL = req.body.imageURL

	try {
		const updatedUser = await User.findOneAndUpdate(
			{username: username},
			{$set: {image: imageURL} },
			{ new: true }
		)
		
		return res.status(200).json({message: 'picture uploaded', user:updatedUser, image:updatedUser.image, testMessage:"hello"});
	} catch (error) {
		res.status(500).json({ message: 'Dang! An error occurred while uploading the picture.' });
	}
}


const editBio = async (req, res) => {
	const username = req.params.username;
	const newBio = req.body.bio
	try {
		const updatedUser = await User.findOneAndUpdate(
			{username: username},
			{$set: {bio: newBio} },
			{ new: true }
		)
		res.status(200).json({message: 'Bio updated'});
	} catch (error) {
		res.status(500).json({ message: 'Dang! An error occurred while updating the bio.' });
	}
}


const addFriend = async(req, res) => {
	const username = req.params.username
	const requestingUserId = req.body.requestingUserId
	const receivingUserId = req.body.receivingUserId

	const requestingUser = await User.findById(requestingUserId);
	if (!requestingUser) {
	return res.status(400).json({ message: "Requesting user not found" });
	}

	try {
		const requestingUserUpdate = await User.findOneAndUpdate(
			{ _id: requestingUserId },
			{ $addToSet: { friends: receivingUserId } },
			{ new: true }
		).exec();

		const receivingUserUpdate = await User.findOneAndUpdate(
			{ _id: receivingUserId },
			{ $addToSet: { friends: requestingUserId } },
			{ new: true }
		).exec();

		const [requestingUser, receivingUser] = await Promise.all([requestingUserUpdate, receivingUserUpdate]);

		if (!requestingUser || !receivingUser) {
			return res.status(404).json({ message: "User not found" });
		}
	
		res.status(200).json({message: 'Friends added to array'});
	} catch (error) {
		res.status(500).json({message: "error adding friend"})
	}

}

const removeFriend = async(req, res) => {
	const username = req.params.username
	const requestingUserId = req.body.requestingUserId
	const receivingUserId = req.body.receivingUserId
	

	try {

		const requestingUserUpdate = await User.findOneAndUpdate(
			{ _id: requestingUserId },
			{ $pull: { friends: receivingUserId } },
			{ new: true }
		).exec();

		const receivingUserUpdate = await User.findOneAndUpdate(
			{ _id: receivingUserId },
			{ $pull: { friends: requestingUserId } },
			{ new: true }
		).exec();

		const [requestingUser, receivingUser] = await Promise.all([requestingUserUpdate, receivingUserUpdate]);


		if (!requestingUser || !receivingUser) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json({message: 'Friends removed'});
	} catch (error) {
		res.status(500).json({message: "error removing friends"})
	}
	
}

const createNotification = async(req, res) => {

	const user_id = req.body.entity_userId
	const message = req.body.notificationMessage


	try {
		const updatedUser = await User.findOneAndUpdate(
			{_id: user_id},
			{$push: {notifications: {
				message: message
			}}},
			{new:true}
		)
		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({message: 'notification sent'});	

	} catch (error) {
		res.status(500).json({message: "error creating notification"})
	}

}

const removeNotification = async(req, res) => {
	const ObjectId = require('mongoose').Types.ObjectId;

	const username = req.params.username
	const notificationId = req.body.notificationId
	const objectIdNotificationId = new ObjectId(notificationId)

	try {
		const updatedUser = await User.findOneAndUpdate(
			{username:username},
			{$pull: {notifications: {_id: objectIdNotificationId}}},
			{new:true}
		);
		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({message: 'notification deleted'});	
	} catch (error) {
		res.status(500).json({message: "error deleting notification"})
	}

}


const UsersController = {
    create: create,
    getUser: getUser,
	uploadImage: uploadImage,
	editBio: editBio,
	searchUsers: searchUsers,
	addFriend: addFriend,
	removeFriend: removeFriend,
	createNotification: createNotification,
	removeNotification: removeNotification
};

module.exports = UsersController;
