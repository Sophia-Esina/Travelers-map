const mongoose = require("mongoose");
const validator = require("validator");

const DreamSchema = new mongoose.Schema(
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
    image: {
      type: String,
      required: true,
      validate: validator.isURL,
    },
  },
  { timestamps: true }
);

const Dream = mongoose.model("Dream", DreamSchema);

module.exports = Dream;
