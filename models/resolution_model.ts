import mongoose from "mongoose";

const resolution_schema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    sr_number: {
      type: String,
      required: true,
      unique: true,
    },
    assigned: {
      type: String,
    },
    resolution_date: {
      type: Date,
      default: Date.now,
    },
    comments: {
      type: String,
    },
  },
  {
    collection: "resolution",
    versionKey: false,
  }
);

const resolution = mongoose.models.system || mongoose.model("resolution", resolution_schema);

export default resolution;
