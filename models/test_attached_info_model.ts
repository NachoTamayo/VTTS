import mongoose from "mongoose";

const test_attached_info_schema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    app: {
      type: String,
      required: true,
    },
    release_version: {
      type: String,
      required: true,
    },
    sr_number: {
      type: Date,
      required: true,
    },
    attached: {
      type: Buffer,
    },
    file_name: {
      type: String,
    },
    stage: {
      type: String,
      required: true,
    },
  },
  {
    collection: "test_attached_info",
    versionKey: false,
  }
);

test_attached_info_schema.pre("validate", async function (next) {
  const { app, release_version, sr_number, stage } = this;

  const existingDocument = await this.model("test_attached_info").findOne({ app, release_version, sr_number, stage });

  if (existingDocument) {
    this.invalidate(
      "app, release_version, sr_number, stage",
      "No se permite la repetición de la combinación de campos"
    );
  }

  next();
});

const test_attached_info_model =
  mongoose.models.test_attached_info || mongoose.model("test_attached_info", test_attached_info_schema);

export default test_attached_info_model;
