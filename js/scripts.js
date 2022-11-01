//Business Logic for AddressBook()
//function to store entires of contacts
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
function Contact(firstName, lastName, phoneNumber, email1, email2, physicalAddress1, physicalAddress2) {
  this.email1 = email1;
  this.email2 = email2;
  this.physicalAddress1 = physicalAddress1;
  this.physicalAddress2 = physicalAddress2;
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
};






//UI Logic
let addressBook = new AddressBook();

function listContacts(addressBookToDisplay){
  let contactsDiv = document.getElementById("contacts")
  contactsDiv.innerText = null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key)  { 
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    ul.append(li);
  });
  contactsDiv.append(ul);
}

function handleDelete(event){
  addressBook.deleteContact(event.target.id);
  document.querySelector("button.delete").removeAttribute("id");
  document.getElementById("contactDetails").setAttribute("class", "hidden");
  listContacts(addressBook);

}

function displayContactDetails(event){
  const contact = addressBook.findContact(event.target.id);
  document.getElementById("firstName").innerText = contact.firstName;
  document.getElementById("lastName").innerText = contact.lastName;
  document.getElementById("phoneNumber").innerText = contact.phoneNumber;
  document.getElementById("email1").innerText = contact.email1;
  document.getElementById("email2").innerText = contact.email2;
  document.getElementById("physicalAddress1").innerText = contact.physicalAddress1;
  document.getElementById("physicalAddress2").innerText = contact.physicalAddress2;
  
  document.querySelector("button.delete").setAttribute("id", contact.id);
  
  document.getElementById("contactDetails").removeAttribute("class");
}

function handleNewContact(event) {
  event.preventDefault();
  const newFirstName = document.getElementById("newFirstName").value;
  const newLastName = document.getElementById("newLastName").value;
  const newPhoneNumber = document.getElementById("newPhoneNumber").value;
  const newEmail1 = document.getElementById("newEmail1").value;
  const newEmail2 = document.getElementById("newEmail2").value;
  const newPhysicalAddress1 = document.getElementById("newPhysicalAddress1").value;
  const newPhysicalAddress2 = document.getElementById("newPhysicalAddress2").value;
  let newContact = new Contact(newFirstName, newLastName, newPhoneNumber, newEmail1, newEmail2, newPhysicalAddress1, newPhysicalAddress2);
  addressBook.addContact(newContact);
  listContacts(addressBook);
}

  window.addEventListener("load", function () {
    const form = document.getElementById("form");
    form.addEventListener("submit", handleNewContact);
    const divContact = document.getElementById("contacts")
    divContact.addEventListener("click", displayContactDetails);
    document.querySelector("button.delete").addEventListener("click", handleDelete);
  });
