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
import { v4 as uuidv4 } from 'uuid';
import { logServerError } from "./utils/api/apiUtils";

import "@trussworks/react-uswds/lib/index.css";
import "./styles/index.scss";

const store = configureStore();
document.title = config.app.title;
const container = document.getElementById("root");
const root = createRoot(container);
const errorBoundaryId = uuidv4();

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter basename={config.app.path}>
        <ErrorBoundary
          FallbackComponent={({ error, resetErrorBoundary }) => (
            <ErrorFallbackModal error={error} resetErrorBoundary={resetErrorBoundary} errorId={errorBoundaryId} />
          )}
          onReset={() => {
            console.info("reloading the page...");
            window.location.reload();
          }}
          onError={(error, info) =>{
            console.debug("error id", errorBoundaryId);
            console.debug("error message", error.message);
            console.debug("error componentStack", info.componentStack);
            logServerError(errorBoundaryId, error.message, info.componentStack);
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
