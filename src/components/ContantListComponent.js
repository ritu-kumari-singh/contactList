import React from "react";
import { deleteContacts, updateContacts } from "../actions";

class ContactListContainer extends React.Component {
  //onclick to expand list item in contact list to diplay more details
  handleExpandClick = (e) => {
    var that = e.target;
    that.classList.toggle("active");
    var content = that.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  };
  handleDeleteContact = () => {
    const { contact } = this.props;
    fetch(`https://jsonplaceholder.typicode.com/users/${contact.id}`, {
      method: "DELETE",
    });
    this.props.dispatch(deleteContacts(contact));
  };
  handleUpdateContact = (e) => {
    const { contact } = this.props;
    const newPhone = e.target.previousElementSibling.value;
    fetch(`https://jsonplaceholder.typicode.com/users/${contact.id}`, {
      method: "PUT",
      body: JSON.stringify({
        phone: newPhone,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.props.dispatch(updateContacts(json));
      });
  };
  render() {
    const { contact } = this.props;
    return (
      <>
        <button className="collapsible" onClick={this.handleExpandClick}>
          {contact.name}
        </button>
        <div className="content">
          <ul>
            <li>Username : {contact.username}</li>
            <li>Email : {contact.email}</li>
            <li>Website : {contact.website}</li>
            <li className="flex row" style={{ justifyContent: "center" }}>
              <input
                type="text"
                defaultValue={contact.phone}
                style={{ marginRight: 10 + "px" }}
              />
              <button
                className="li_button"
                title="Edit contact"
                onClick={this.handleUpdateContact}
              >
                Update
              </button>
            </li>
            <li className="flex row" style={{ justifyContent: "space-evenly" }}>
              <button
                className="li_button"
                title="Delete contact"
                onClick={this.handleDeleteContact}
                style={{ backgroundColor: "red" }}
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default ContactListContainer;
