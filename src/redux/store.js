import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import docReducer from "./slices/docSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  doc: docReducer,
});

export default rootReducer;
