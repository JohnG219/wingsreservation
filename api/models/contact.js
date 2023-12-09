import mongoose from 'mongoose';
const { Schema } = mongoose;

const ContactSchema = new mongoose.Schema({
  bidcc: {
    type: String,
  },
  uecc: {
    type: String,
  },
  decc: {
    type: String,
  },
  rqss: {
    type: String,
  },
  vss: {
    type: String,
  },
});

export default mongoose.model("contact", ContactSchema);