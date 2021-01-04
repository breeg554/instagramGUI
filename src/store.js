import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import history from "./history";

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer(history),
    preloadedState,
    compose(
      composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
    )
  );

  return store;
}
