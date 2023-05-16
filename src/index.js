import React from "react";
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import config from "./config";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store/configureStore.dev";

import '@trussworks/react-uswds/lib/index.css';
import './styles/index.scss';

const store = configureStore();
document.title = config.app.title;
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={config.app.path}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
