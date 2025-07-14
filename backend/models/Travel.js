const mongoose = require("mongoose");
const validator = require("validator");

const TravelSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coordinates: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: true,
      validate: validator.isURL,
      message: "Image should be a valid URL",
    },
  },
  { timestamps: true }
);

const Travel = mongoose.model("Travel", TravelSchema);

module.exports = Travel;
