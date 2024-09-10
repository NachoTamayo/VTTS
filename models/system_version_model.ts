import mongoose from "mongoose";

const system_version_schema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    app: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    delivery_date: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "system_version",
    versionKey: false,
  }
);

system_version_schema.pre("validate", async function (next) {
  const { app, version } = this;

  const existingDocument = await this.model("system_version").findOne({ app, version });

  if (existingDocument) {
    this.invalidate("app, version", "No se permite la repetición de la combinación de campos");
  }

  next();
});

const system_version_model = mongoose.models.system_version || mongoose.model("system_version", system_version_schema);

export default system_version_model;
