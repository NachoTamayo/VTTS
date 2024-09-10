import mongoose from "mongoose";

const test_status_schema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    id_status: {
      type: String,
      required: true,
      unique: true,
    },
    desc_status: {
      type: String,
      required: true,
    },
    is_failed: {
      type: Boolean,
      default: false,
    },
    display_order: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    collection: "test_status",
    versionKey: false,
  }
);

const test_status_model = mongoose.models.test_status || mongoose.model("test_status", test_status_schema);

export default test_status_model;
