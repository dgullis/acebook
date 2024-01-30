const mongoose = require("mongoose");

const root = ''

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true }, // consider validation options within schema
  bio: String,
  image: {
    type: String,
    get: v => '${root}${v}' // possible solution but requires image hosting server
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // stores ObjectIds of documents in 'User' collection
                                                                    // when retrieving a User look to use populate() function to retrieve full documents of friends
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
