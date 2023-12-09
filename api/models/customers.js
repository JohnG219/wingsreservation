import mongoose from 'mongoose';
const { Schema } = mongoose;

const CustomersSchema = new mongoose.Schema({
  bid: {
    type: String,
  },
  sdate: {
    type: Date,
  },
  edate: {
    type: Date,
  },
  un: {
    type: String,
  },
  ue: {
    type: String,
  },
  de: {
    type: String,
  },
  rn: {
    type: String,
  },
  hn: {
    type: String,
  },
});

export default mongoose.model("customer",CustomersSchema)