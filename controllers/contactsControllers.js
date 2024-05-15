import Contact from "../models/contact.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ ownerId: req.user.id });

    if (!contacts) throw HttpError(404);

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findOne({
      _id: contactId,
      ownerId: req.user.id,
    });

    if (!contact) throw HttpError(404);

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findOneAndDelete({
      _id: contactId,
      ownerId: req.user.id,
    });

    if (!contact) throw HttpError(404);

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const ownerId = req.user.id;

    await Contact.create({ name, email, phone, ownerId });

    res.status(201).json(Contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findOneAndUpdate(
      { _id: contactId, ownerId: req.user.id },
      req.body,
      { new: true }
    );

    if (!contact) throw HttpError(404);

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findOneAndUpdate(
      { _id: contactId, ownerId: req.user.id },
      req.body,
      { new: true }
    );

    if (!contact) throw HttpError(404);

    res.status(200).json(updatedStatusContact);
  } catch (error) {
    next(error);
  }
};
