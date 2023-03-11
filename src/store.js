import { configureStore } from "@reduxjs/toolkit";
import cordReducer from "./features/cords/cordsSlice";
import locationReducer from "./features/Loaction/locationSlice";
export default configureStore({
  reducer: { cords: cordReducer, location: locationReducer },
});
