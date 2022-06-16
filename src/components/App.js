import ContactListContainer from "./ContantListComponent";
import React from "react";
import { addContact, fetchContacts } from "../actions";
import { connect } from "react-redux";

class App extends React.Component {
  handleNewContact = () => {
    document.getElementById("contact_list").style.display = "none";
    document.getElementById("new_contact_form").style.display = "block";
    document.getElementById("add_new_contact").style.display = "none";
  };
  handleAddContact = (e) => {
    e.preventDefault();
    //fetch values entered by user
    const name = e.target[0].value;
    const email = e.target[1].value;
    const username = e.target[2].value;
    const website = e.target[3].value;
    const phone = e.target[4].value;
    //make a post call
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        username,
        phone,
        website,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        //add new contact to the contact list
        this.props.dispatch(addContact(json));
      });
    document.getElementById("contact_list").style.display = "block";
    document.getElementById("new_contact_form").style.display = "none";
    document.getElementById("add_new_contact").style.display = "initial";
  };
  componentDidMount() {
    //fetch list of contacts when component is rendered for the first time
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => this.props.dispatch(fetchContacts(json)));
  }
  render() {
    const { contacts } = this.props;
    return (
      <div className="App">
        <button
          id="add_new_contact"
          style={{ width: 220 + "px" }}
          className="custom_button hover_button"
          title="Add new contact"
          onClick={this.handleNewContact}
        >
          + New Contact
        </button>
        <div id="contact_list" style={{ margin: 40 + "px" }}>
          {contacts.map((contact, index) => {
            return (
              <ContactListContainer
                contact={contact}
                key={`contact=${index}`}
                dispatch={this.props.dispatch}
              />
            );
          })}
        </div>
        <div id="new_contact_form" style={{ display: "none" }}>
          <form onSubmit={this.handleAddContact}>
            <div
              className="flex column spaced"
              style={{ height: "fit-content" }}
            >
              <div className="flex row">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter contact name"
                />
              </div>
              <div className="flex row">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter contact email"
                />
              </div>
              <div className="flex row">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter User name"
                />
              </div>
              <div className="flex row">
                <label>Website</label>
                <input
                  type="text"
                  name="website"
                  placeholder="Enter contact website"
                />
              </div>
              <div className="flex row">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter contact phone"
                />
              </div>
              <button
                type="submit"
                className="custom_button"
                style={{ top: 10 + "px" }}
              >
                ADD CONTACT
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contacts: state.list,
  };
}
const connectedAppComponent = connect(mapStateToProps)(App);
export default connectedAppComponent;
