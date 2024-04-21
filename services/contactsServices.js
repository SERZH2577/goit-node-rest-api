const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const path = require("node:path");

const contactsPath = path.join(__dirname, "db/contacts.json");

function writeContacts(books) {
  return fs.writeFile(contactsPath, JSON.stringify(books, undefined, 2));
}

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, { encoding: "utf-8" });

  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => (contact.id = contactId));

  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const i = contacts.findIndex((contact) => contact.id === contactId);
  const removeContact = contacts[i];

  contacts.splice(i, 1);
  await writeContacts(contacts);

  return removeContact || null;
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

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
