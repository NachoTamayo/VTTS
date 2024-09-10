import mongoose from "mongoose";

const system_schema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    app: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    explorer_version: {
      type: String,
      default: true,
    },
    jre_version: {
      type: String,
      required: true,
    },
  },
  {
    collection: "system",
    versionKey: false,
  }
);

const system_model = mongoose.models.system || mongoose.model("system", system_schema);

export default system_model;
