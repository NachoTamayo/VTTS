import mongoose from "mongoose";

const vtts_user_schema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    assigned: {
      type: String,
      required: true,
      unique: true,
    },
    user_name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mail_sign: {
      type: String,
      required: true,
    },
    date_modification: {
      type: Date,
      default: Date.now,
    },
    user_modification: {
      type: String,
      required: true,
    },
    user_message: {
      type: String,
      default: "",
    },
    profile: {
      type: String,
      required: true,
    },
    sr_filter_1: {
      type: String,
      default: "",
    },
    sr_filter_2: {
      type: String,
      default: "",
    },
  },
  {
    collection: "vtts_user",
    versionKey: false,
  }
);

const vtts_user_model = mongoose.models.vtts_user || mongoose.model("vtts_user", vtts_user_schema);

export default vtts_user_model;
