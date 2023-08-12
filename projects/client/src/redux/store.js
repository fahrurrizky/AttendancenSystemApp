import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./authReducer";

export const store = configureStore({
  reducer: {
    authreducer: authreducer,
  },
});
