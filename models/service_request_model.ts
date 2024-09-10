import mongoose from "mongoose";

const service_request_schema = new mongoose.Schema({
  service_request: {
    type: String,
  },
  sr_number: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  external_link: {
    type: String,
  },
  data_test_path: {
    type: String,
  },
  last_tester: {
    type: String,
  },
  status_sr: {
    type: String,
  },
});

const service_request = mongoose.models.system || mongoose.model("service_request", service_request_schema);

export default service_request;
