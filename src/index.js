import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import config from "./config";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store/configureStore.dev";

import { ErrorBoundary  } from 'react-error-boundary';
import ErrorFallbackModal from "./components/ErrorFallbackModal/ErrorFallbackModal";
import { logServerError } from "./utils/api/apiUtils";

import "@trussworks/react-uswds/lib/index.css";
import "./styles/index.scss";

const store = configureStore();
document.title = config.app.title;
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter basename={config.app.path}>
        <ErrorBoundary
          FallbackComponent={ErrorFallbackModal}
          onReset={() => {
            console.info("reloading the page...");
            window.location.reload();
          }}
          onError={(error, info) =>{
            console.error("error message", error.message);
            console.error("error componentStack", info.componentStack);
            //AG: log to an external API currently not working
            //logServerError(error.message, info);
          }}
        >
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
