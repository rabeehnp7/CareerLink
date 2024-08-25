import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default is localStorage
import authReducer from "./authSlice";
import jobReducer from "./jobSlice";
import companyReducer from "./companySlice"


// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer=combineReducers({
  auth:authReducer,
  jobs:jobReducer,
  company:companyReducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer);

const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
export default store;
