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
    const contact = await Contact.findById(contactId);

    if (!contact) throw HttpError(404);

    if (contact.ownerId.toString() !== req.user.id) throw HttpError(403);

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);

    if (!contact) throw HttpError(404);
    if (contact.ownerId.toString() !== req.user.id) throw HttpError(403);

    await Contact.findByIdAndDelete(contactId);

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
    const contact = await Contact.findById(contactId);

    if (!contact) throw HttpError(404);
    if (contact.ownerId.toString() !== req.user.id) throw HttpError(403);

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);

    if (!contact) throw HttpError(404);
    if (contact.ownerId.toString() !== req.user.id) throw HttpError(403);

    const updatedStatusContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedStatusContact);
  } catch (error) {
    next(error);
  }
};
