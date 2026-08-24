import { legacy_createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariantModule from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

// Vite 8 returns module.exports for default imports from CommonJS packages.
const reduxImmutableStateInvariant =
  reduxImmutableStateInvariantModule.default ??
  reduxImmutableStateInvariantModule;

const configureStore = (initialState) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return legacy_createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
};

export default configureStore;
