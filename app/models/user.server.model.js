// Load mongoose model and schema object
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Define a new user schema
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  street: String,
  city: String,
  email: {
    type: String,
    index: true,
    match: /.+\@.+\..+/,
    unique: true,
  },
  phone: String,
  province: String,

  password: {
    type: String,
    validate: [(password) => password.length >= 8, "at least 8 characters"],
  },
  userType: String,
});

// Use pre-saved middleware to hash password
UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

const Foo = mongoose.model("User", UserSchema);
Foo.createIndexes();
