const { MongoStore } = require("connect-mongo");
const mongoose = require("mongoose");
// Define a schema
const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
// Model and export the schema
module.exports = mongoose.model("User", UserSchema);
