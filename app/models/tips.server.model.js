// Load mongoose model and schema object
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a new user schema
const TipsSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  title: String,
  message: String,
  patient: {
    type: Schema.ObjectId,
    ref: "User",
  },
  resourceLink: String
});

const Foo = mongoose.model("Tips", TipsSchema);
Foo.createIndexes();
