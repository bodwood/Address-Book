//Business Logic for AddressBook()
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

//add a new prototype to addressbook called "addContact"
//addContact is a function that takes in "contact" as the parameter
//function declares this.id from addressbook above. Where id is the key and this.assignId() is the value.
//[contact.id] is in brackets because this is how the key is made
//the value to the key is the contact
//i.e. key = id
//i.e. value = contact information
AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

//
AddressBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function (id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function (id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};


//Business Logic for Contact()
function Contact(firstName, lastName, addressBook) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.addressBook = addressBook;
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
};


let addressBook = new AddressBook();

let contact = new Contact("Ada", "Lovelace", "503-555-0100");
let contact2 = new Contact("Grace", "Hopper", "503-555-0199");
addressBook.addContact(contact);
addressBook.addContact(contact2);

//console.log(addressBook.contacts);
//console.log();
//console.log(addressBook.contacts[2]);
//console.log();
//console.log(contact.id);
//console.log(contact2.id);
////console.log()
console.log(addressBook.findContact(1));
//console.log();
//console.log(addressBook.deleteContact(1));
console.log();
//console.log(addressBook);