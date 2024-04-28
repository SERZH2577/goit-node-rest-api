import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const contactsPath = path.join("db", "contacts.json");

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, { encoding: "utf-8" });

  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const i = contacts.findIndex((contact) => contact.id === contactId);
  const removedContact = contacts[i];

  contacts.splice(i, 1);
  await writeContacts(contacts);

  return removedContact || null;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);

  await writeContacts(contacts);

  return newContact;
}

async function updateContactById(contactId, data) {
  const contacts = await listContacts();
  const i = contacts.findIndex((contact) => contact.id === contactId);

  if (i !== -1) null;

  contacts[i] = { ...contacts[i], ...data };

  await writeContacts(contacts);

  return contacts[i];
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
