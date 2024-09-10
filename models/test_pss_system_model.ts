import mongoose from "mongoose";

const test_pss_system_schema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    sr_type: {
      type: String,
    },
    sr_number: {
      type: String,
      required: true,
    },
    assigned: {
      type: String,
    },
    status: {
      type: String,
      ref: "test_pss_system",
    },
    date_test: {
      type: Date,
      default: Date.now,
    },
    comments: {
      type: String,
    },
    date_modification: {
      type: Date,
      default: Date.now,
    },
    release_note: {
      type: String,
    },
    windchill_comment: {
      type: String,
      ref: "service_request",
    },
    app: {
      type: String,
      required: true,
    },
    release_version: {
      type: String,
      required: true,
    },
    stage: {
      type: String,
      required: true,
    },
  },
  {
    collection: "test_pss_system",
    versionKey: false,
  }
);

test_pss_system_schema.pre("validate", async function (next) {
  const { sr_number, app, release_version, stage } = this;

  const existingDocument = await this.model("test_pss_system").findOne({ sr_number, app, release_version, stage });

  if (existingDocument) {
    this.invalidate(
      "sr_number, app, release_version, stage",
      "No se permite la repetición de la combinación de campos"
    );
  }

  next();
});

const test_pss_system_model =
  mongoose.models.test_pss_system || mongoose.model("test_pss_system", test_pss_system_schema);

export default test_pss_system_model;
