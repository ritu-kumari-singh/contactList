import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/index.css";
import App from "./components/App";
import { Provider } from "react-redux";
import contacts from "./reducers";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

const logger =
  ({ dispatcher, getState }) =>
  (next) =>
  (action) => {
    if (typeof action !== "function") {
      console.log("ACTION TYPE = ", action.type);
    }
    next(action);
  };

const store = configureStore({
  reducer: contacts,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger).concat(thunk),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
