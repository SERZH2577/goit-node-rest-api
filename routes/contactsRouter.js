import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  validateCreateContactBody,
  validateUpdateContactBody,
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateCreateContactBody, createContact);

contactsRouter.put("/:id", validateUpdateContactBody, updateContact);

export default contactsRouter;
