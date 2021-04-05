// Load mongoose model and schema object
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Define a new user schema
const VitalSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  temperature: String,
  heartRate: String,
  systolic: String,
  distolic: String,
  respiratoryRate: String,
  patient: {
    type: Schema.ObjectId,
    ref: "User",
  },
});



const Foo = mongoose.model("Vital", VitalSchema);
Foo.createIndexes();
