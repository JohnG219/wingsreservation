import mongoose from 'mongoose';
const { Schema } = mongoose;

const TransactionSchema = new mongoose.Schema({
  atmpay: {
    type: String,
  },
  paydate: {
    type: String,
  },
  paycard: {
    type: String,
  },
  paysec: {
    type: String,
  },
  payamount: {
    type: String,
  },
  bidpay: {
    type: String,
  },
  uepay: {
    type: String,
  },
});

export default mongoose.model("transaction", TransactionSchema);