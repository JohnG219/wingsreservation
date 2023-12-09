import contact from "../models/contact.js";

export const createcontact = async (req, res, next) => {
  const newContact = new contact(req.body);
  try {
    const savedContact = await newContact.save();
    res.status(200).json(savedContact);
  } catch (err) {
    next("err");
  }
};

export const deletecontact = async (req, res, next) => {
  const contactId = req.params.id;
  try {
    const deletedContact = await contact.findByIdAndRemove(contactId);
    if (!deletedContact) {
      return res.status(404).json({ message: "contact not found" });
    }
    res.status(200).json({ message: "contact deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const getcontact = async (req, res, next) => {
  try {
    const a = await contact.find();
    res.status(200).json(a);
  } catch (err) {
    next(err);
  }
};
