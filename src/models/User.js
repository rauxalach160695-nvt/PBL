const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcryptjs");

const User = new Schema({
  // userId: { type: Number, required: true ,unique: true},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, required: true, default: "2" },
});

User.pre("save", async function (next) {
  try {
    //Generate  a salt
    const salt = await bcrypt.genSalt(10);
    //Generate a password hash (salt + hash )
    const passwordHashed = await bcrypt.hash(this.password,salt)
    //Re-assign password hashed
    this.password = passwordHashed
    next()
  } catch (error) {
    next(error);
  }
});

User.methods.isValidPassword = async function(newPassword){
    try {
        return await bcrypt.compare(newPassword,this.password)
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = mongoose.model("User", User);
