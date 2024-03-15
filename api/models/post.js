const mongoose = require("mongoose");

const root = "/images/";

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const CommentSchema = new mongoose.Schema(
    {
        message: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        likes: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const PostSchema = new mongoose.Schema(
    {
        message: String,
        media: {
            type: String,
            get: (v) => `${root}${v}`,
        },
        likes: { type: [String], default: [] },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comments: [CommentSchema],
    },
    { timestamps: true, toJSON: { getters: true } }
);

//time stamps automatically creates 'createdAt' and 'updatedAt' fields and pupulates these with a time stamps

// We use the Schema to create the Post model. Models are classes which we can
// use to construct entries in our Database.
const Post = mongoose.model("Post", PostSchema);
const Comment = mongoose.model("Comment", CommentSchema);
// These lines will create a test post every time the server starts.
// You can delete this once you are creating your own posts.

// const dateTimeString = new Date().toLocaleString("en-GB");
// new Post({ message: `Test message, created at ${dateTimeString}` }).save();

// new Post({
//     message: "Test message new schema",
//     postedBy: "65b8e7e82c3b14ab340c6753",
//     comments: [
//         {
//             message: "hello test1",
//             user: "65b8e7e82c3b14ab340c6754",
//         },
//     ],
// }).save();

module.exports = Post;
