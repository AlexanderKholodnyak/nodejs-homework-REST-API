const fs = require('fs/promises')

const path = require('path');
const { v4: uuid } = require('uuid')

const contactsPath = path.join(__dirname,'./contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
    
}

const getContactById = async (contactId) => {
    const data = await fs.readFile(contactsPath, "utf-8");
        
    const contacts = JSON.parse(data);
    const contactItem = contacts.find((contact) => String(contact.id) === contactId);
        
    return contactItem;
        
}

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf-8");
        
  const contacts = JSON.parse(data);
  // console.log(contacts);
  const contactItem = contacts.filter((contact) => String(contact.id) !== contactId);
  // console.log(String(contactId));
  await fs.writeFile(contactsPath, JSON.stringify(contactItem));
  return contactItem;
 
    
}

const addContact = async (body) => {
  const id = uuid();
  const data =await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  const newContact = {id, ...body};
  const newContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  const contact = contacts.find((contact) => String(contact.id) === contactId);

  const newContact = { ...contact, ...body };
  const newListContacts = contacts.map((obj) =>
    String(obj.id) === contactId ? newContact : obj
  );

  await fs.writeFile(
    contactsPath,
    JSON.stringify(newListContacts, null, 2),
    "utf8"
  );

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
