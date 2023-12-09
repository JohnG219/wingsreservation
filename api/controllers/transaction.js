import transaction from "../models/transaction.js";

export const createtransaction = async (req, res, next) => {
  const newTransaction = new transaction(req.body);
  try {
    const savedTransaction = await newTransaction.save();
    res.status(200).json(savedTransaction);
  } catch (err) {
    next("err");
  }
};

export const deletetransaction = async (req, res, next) => {
  const transactionId = req.params.id;
  try {
    const deletedTransaction = await transaction.findByIdAndRemove(
      transactionId
    );
    if (!deletedTransaction) {
      return res.status(404).json({ message: "transaction not found" });
    }
    res.status(200).json({ message: "transaction deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const gettransaction = async (req, res, next) => {
  try {
    const a = await transaction.find();
    res.status(200).json(a);
  } catch (err) {
    next(err);
  }
};
