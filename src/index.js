
// import './wdyr'; // <--- first import
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore.dev";
import config from "./config";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";

const store = configureStore();

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={config.app.path}>
        <App />
      </BrowserRouter>
    </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

document.title = config.app.title;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
