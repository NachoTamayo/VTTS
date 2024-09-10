import mongoose from "mongoose";

const sr_type_schema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    sr_type: {
      type: String,
      required: true,
      unique: true,
    },
    drescription: {
      type: String,
      required: true,
    },
  },
  {
    collection: "sr_type",
    versionKey: false,
  }
);

const sr_type = mongoose.models.system || mongoose.model("sr_type", sr_type_schema);

export default sr_type;
