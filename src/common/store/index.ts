import {
  failedLoadingAction,
  hideLoaderAction,
  resetAllLoadersAction,
  showLoaderAction,
  startLoadingAction,
  successLoadingAction
} from "../loaderRedux/actions";

import createSagaMiddleware from "redux-saga";
import { reducers } from "./combineReducers";
import { sagas } from "./combineSagas";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { Tuple, configureStore } from "@reduxjs/toolkit";
import { reduxStorage } from "./storage";

const persistConfig = {
  key: "root",
  whitelist: ["login"], // Only these reducers will be persisted.
  storage: reduxStorage,
  stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, reducers);
const initState: any = {};

const internetCheckerMiddleware = (store: any) => (next: any) => (action: any) => {
  // In no internet, we should allow some actions
  const whiteListActions = [
    showLoaderAction,
    startLoadingAction, // We should allow show Loader
    hideLoaderAction,
    successLoadingAction,
    failedLoadingAction, // We should allow hide Loader
    resetAllLoadersAction // We should allow reset all Loader
  ];
  if (true || whiteListActions.includes(action.type) || !action.type.startsWith("src/")) {
    return next(action);
  }
};

const sagaMiddleware = createSagaMiddleware();
export const store: any = configureStore({
  reducer: persistedReducer,
  middleware: () => new Tuple(sagaMiddleware, internetCheckerMiddleware),
  preloadedState: initState
})

export const persistor: any = persistStore(store);
sagaMiddleware.run(sagas);

store.subscribe(() => {
  console.log("Store Changed ", store.getState());
});
