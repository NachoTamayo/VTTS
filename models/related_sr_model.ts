import mongoose from "mongoose";

const related_sr_schema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    sr: {
      type: String,
      required: true,
    },
    sr_related_to: {
      type: String,
      required: true,
    },
    linked_by: {
      type: String,
      required: true,
    },
  },
  {
    collection: "related_sr",
    versionKey: false,
  }
);

related_sr_schema.pre("validate", async function (next) {
  const { sr, sr_related_to } = this;

  const existingDocument = await this.model("related_schema").findOne({ sr, sr_related_to });

  if (existingDocument) {
    this.invalidate(" sr, sr_related_to", "No se permite la repetición de la combinación de campos");
  }

  next();
});

const related_sr = mongoose.models.system || mongoose.model("related_sr", related_sr_schema);

export default related_sr;
