import mongoose from "mongoose";

const version_forecast_schema = new mongoose.Schema(
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
    sr_number: {
      type: String,
      required: true,
    },
    assigned: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    date_modification: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "version_forecast",
    versionKey: false,
  }
);

//Unique index for app, version, sr_number
version_forecast_schema.pre("validate", async function (next) {
  const { app, version, sr_number } = this;

  // Busca documentos en la colección con la misma combinación de campos
  const existingDocument = await this.model("version_forecast").findOne({ app, version, sr_number });

  // Si se encuentra un documento existente, lanza un error de validación
  if (existingDocument) {
    this.invalidate("app, version, sr_number", "No se permite la repetición de la combinación de campos");
  }

  next();
});

const version_forecast_model =
  mongoose.models.version_forecast || mongoose.model("version_forecast", version_forecast_schema);

export default version_forecast_model;
