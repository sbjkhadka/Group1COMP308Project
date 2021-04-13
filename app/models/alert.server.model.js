const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlertSchema = new Schema({
  message: {
    type: String,
    required: "Message is required"
  },
  unread: Boolean,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  created: {
    type: Date,
    default: Date.now
  }
});

AlertSchema.set("toJSON", {
  getters: true,
  virtuals: true
});

mongoose.model("Alert", AlertSchema);
