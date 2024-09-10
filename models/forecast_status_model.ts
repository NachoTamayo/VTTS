import mongoose from "mongoose";

const forecast_status_schema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    status: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    collection: "forecast_status",
    versionKey: false,
  }
);

const forecast_status = mongoose.models.system || mongoose.model("forecast_status", forecast_status_schema);

export default forecast_status;
