import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";

// const reducer = combineReducers({});
// const localCartItems = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];
// const initState = {
//   cart: { cartItems : localCartItems}
// };
const store = createStore(
  rootReducer,

  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
