import {
  FETCH_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
} from "../actions";

const initialContactState = {
  list: [],
};

export default function contacts(state = initialContactState, action) {
  switch (action.type) {
    case FETCH_CONTACTS:
      return {
        ...state,
        list: action.contacts,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        list: state.list.map((listItem, i) =>
          listItem.id === action.contact.id
            ? { ...listItem, phone: action.contact.phone }
            : listItem
        ),
      };
    case DELETE_CONTACT:
      const filteredArray = state.list.filter(
        (contact) => contact.id !== action.contact.id
      );
      return {
        ...state,
        list: filteredArray,
      };
    case ADD_CONTACT:
      return {
        ...state,
        list: [action.contact, ...state.list],
      };
    default:
      return state;
  }
}
