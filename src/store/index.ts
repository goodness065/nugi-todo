import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { todosApi } from "../service/api";
import authReducer from "../slice/auth-slice"

export const Store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});

setupListeners(Store.dispatch);
