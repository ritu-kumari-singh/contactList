export const FETCH_CONTACTS = "FETCH_CONTACTS";
export const ADD_CONTACT = "ADD_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const UPDATE_CONTACT = "UPDATE_CONTACT";

//action creators
export function fetchContacts(contacts) {
  return {
    type: FETCH_CONTACTS,
    contacts,
  };
}

export function addContact(contact) {
  return {
    type: ADD_CONTACT,
    contact,
  };
}

export function deleteContacts(contact) {
  return {
    type: DELETE_CONTACT,
    contact,
  };
}

export function updateContacts(contact) {
  return {
    type: UPDATE_CONTACT,
    contact,
  };
}
