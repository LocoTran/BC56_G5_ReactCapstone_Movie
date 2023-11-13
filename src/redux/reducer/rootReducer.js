import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { spinnerReducer } from "./spinnerReducer";
// import * as reducer from "./redux/reducer";

export let rootReducer = combineReducers({
  userReducer,
  spinnerReducer,
});
