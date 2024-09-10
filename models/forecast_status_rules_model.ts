import mongoose from "mongoose";

export interface IForecastStatusRules extends mongoose.Document {
  _id: string;
  status_from: string;
  status_to: string;
}

const forecast_status_rules_schema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    status_from: { type: String, required: true },
    status_to: { type: String, required: true },
  },
  {
    collection: "forecast_status_rules",
    versionKey: false,
  }
);

forecast_status_rules_schema.pre("validate", async function (next) {
  const { status_from, status_to } = this;

  const existingDocument = await this.model("forecast_status_rules_schema").findOne({ status_from, status_to });

  if (existingDocument) {
    this.invalidate(" status_from, status_to ", "No se permite la repetición de la combinación de campos");
  }

  next();
});

const forecast_status_rules =
  mongoose.models.system || mongoose.model("forecast_status_rules", forecast_status_rules_schema);

export default forecast_status_rules;
