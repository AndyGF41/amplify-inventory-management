import { combineReducers } from "@reduxjs/toolkit";
// Import your reducers here, for example:
import inventoryReducer from "../features/inventory/inventorySlice";

const rootReducer = combineReducers({
  // Add your reducers here, for example:
  inventory: inventoryReducer,
});

export default rootReducer;
