const mongoose = require('mongoose');
const crypto = require('crypto');
const User = require('../models/user');
const Post = require('../models/post');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

async function seedDatabase() {

    // Empty database
    await User.deleteMany({});
    await Post.deleteMany({});

    // List of users
    const users = [ 
        { username: 'Alice', email: 'alice@example.com', password: 'Passw0rd!A', image: 'alice.jpg', bio: 'Hello, I am Alice! I love ice cream' },
        { username: 'Bob', email: 'bob@example.com', password: 'Passw0rd!B', image: 'bob.jpg', bio: 'Better than any other Bob.' },
        { username: 'Claire', email: 'claire@example.com', password: 'Passw0rd!C', image: 'claire.jpg', bio: 'Creatively coding Claire.' },
        { username: 'David', email: 'david@example.com', password: 'Passw0rd!D', image: 'david.jpg', bio: 'Dastardly dashing David' },
        { username: 'Eugene', email: 'eugene@example.com', password: 'Passw0rd!E', image: 'eugene.jpg', bio: 'Eventful evenings eating eucalyptus.' }       
    ];

    // Password hashing
    function hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    };

    // Add users to database
    for (const userData of users) {

        const hashedPassword = hashPassword(userData.password);
        
        userData.password = hashedPassword;
        
        const user = new User(userData);
        await user.save();
    }

    // Set up friend relationships
    const addedUsers = await User.find({});

    addedUsers[0].friends.push(addedUsers[1]._id, addedUsers[2]._id, addedUsers[3]._id, addedUsers[4]._id);
    addedUsers[1].friends.push(addedUsers[0]._id, addedUsers[2]._id, addedUsers[3]._id);
    addedUsers[2].friends.push(addedUsers[0]._id, addedUsers[1]._id);
    addedUsers[3].friends.push(addedUsers[0]._id, addedUsers[1]._id);
    addedUsers[4].friends.push(addedUsers[0]._id);

    await Promise.all(addedUsers.map(user => user.save()));

    // Set posts

    const posts = [
        {
            message: 'Who is your favourite character from the Office US?',
            likes: [`${addedUsers[2]._id}`, `${addedUsers[3]._id}`, `${addedUsers[4]._id}`], 
            media: null,
            postedBy: addedUsers[0]._id,
            comments: [
                { message: 'JIM', user: addedUsers[1]._id },
                { message: 'DWIGHT', user: addedUsers[2]._id },
                { message: 'CREED!!!', user: addedUsers[2]._id }
            ],
        },

        {
            message: 'Who wants to go the beach today?',
            media: null,
            likes: [`${addedUsers[0]._id}`, `${addedUsers[4]._id}`, `${addedUsers[2]._id}`], // array of user IDs who liked the post
            postedBy: addedUsers[1]._id,
            comments: [
                { message: 'Not a chance', user: addedUsers[0]._id },
                { message: 'I shall go to the beach with your my fair lord', user: addedUsers[0]._id },
            ],
        },

        {
            message: "Just whipped up some heavenly jacket potatoes for dinner, crispy on the outside, fluffy on the inside.",
            media: 'jacket-potatoe.jpeg',
            likes: [`${addedUsers[1]._id}`, `${addedUsers[4]._id}`], // array of user IDs who liked the post
            postedBy: addedUsers[2]._id,
            comments: [
                { message: '# jacket potatoe life', user: addedUsers[1]._id },
                { message: 'get a life', user: addedUsers[0]._id },
                { message: 'not a potatoe fan?', user: addedUsers[2]._id }
            ],
        },

        {
            message: 'Just had the most peaceful day by the lake, fishing rod in hand and surrounded by nature #nature',
            media: 'fishing.jpeg',
            likes: [`${addedUsers[2]._id}`], // array of user IDs who liked the post
            postedBy: addedUsers[3]._id,
            comments: [
                { message: 'get a life', user: addedUsers[0]._id },
                { message: '#fishing life!!!!', user: addedUsers[4]._id },
            ],
        },

        {
            message: "Jumped out of a plane today and experienced the ultimate thrill of freefall! Adrenaline rush like no other. Living life on the edge! #SkydivingAdventure",
            media: 'sky-diver.avif',
            likes: [`${addedUsers[2]._id}`, `${addedUsers[3]._id}`, `${addedUsers[1]._id}`], // array of user IDs who liked the post
            postedBy: addedUsers[4]._id,
            comments: [
                { message: 'get a life!', user: addedUsers[0]._id },
                { message: 'i think there might be a cyberbully here', user: addedUsers[2]._id },
                { message: 'get a life!', user: addedUsers[0]._id }
            ],
        }
    ];

    // Associate posts with users
    const seededPosts = await Post.insertMany(posts);

    // Update the user's posts
    for (const post of seededPosts) {
        const user = addedUsers.find(u => u._id.equals(post.postedBy));
        user.posts.push(post._id);
        await user.save();
    }

    // End process
    console.log('Database seeded successfully');
};

module.exports = seedDatabase;