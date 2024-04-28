import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} from "../services/contactsServices.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();

    if (!contacts) throw HttpError(404);

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id);

    if (!contact) throw HttpError(404);

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.id);

    if (!contact) throw HttpError(404);

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = createContactSchema.validate({ name, email, phone });

    if (error) throw HttpError(400);

    const newContact = await addContact(name, email, phone);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const { name, email, phone } = req.body;
    const { error } = updateContactSchema.validate({ name, email, phone });

    if (Object.keys(req.body).length === 0)
      throw HttpError(400, "Body must have at least one field");

    if (error) throw HttpError(400);

    const updatedContact = await updateContactById(contactId, {
      name,
      email,
      phone,
    });

    if (!updatedContact) throw HttpError(404);

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};
