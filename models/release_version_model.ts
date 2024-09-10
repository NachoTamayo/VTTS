import mongoose from "mongoose";

const release_version_schema = new mongoose.Schema(
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
    test_deadline: {
      type: Date,
      required: true,
    },
    stage: {
      type: String,
      required: true,
    },
  },
  {
    collection: "release_version",
    versionKey: false,
  }
);

release_version_schema.pre("validate", async function (next) {
  const { app, release_version, stage } = this;

  const existingDocument = await this.model("release_version").findOne({ app, release_version, stage });

  if (existingDocument) {
    this.invalidate("app, release_verion, stage", "No se permite la repetición de la combinación de campos");
  }

  next();
});

const release_version = mongoose.models.system || mongoose.model("release_version", release_version_schema);

export default release_version;
