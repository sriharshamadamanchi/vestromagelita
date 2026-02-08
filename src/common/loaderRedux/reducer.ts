import { failedLoadingAction, type failedLoadingActionType, hideLoaderAction, removeLoaderAction, type removeLoaderActionType, resetAllLoadersAction, resetReducersAction, showLoaderAction, startLoadingAction, type startLoadingActionType, successLoadingAction, type successLoadingActionType } from "./actions";
import { resetState } from "../store/typeSafe";
import { loaderReducerStateType } from "../store/types";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  loaders: {}
};

export const loaderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      showLoaderAction,
      (state: loaderReducerStateType) => {
        state.loading = true;
      }
    )
    .addCase(
      hideLoaderAction,
      (state: loaderReducerStateType) => {
        state.loading = false;
      }
    )

    .addCase(
      startLoadingAction,
      (state: loaderReducerStateType, action: any) => {
        const { payload }: { payload: startLoadingActionType } = action;
        state.loaders[payload.name] = {
          loading: true,
          msg: payload?.msg
        };
      }
    )

    .addCase(
      successLoadingAction,
      (state: loaderReducerStateType, action: any) => {
        const { payload }: { payload: successLoadingActionType } = action;
        state.loaders[payload.name] = {
          success: {
            status: true,
            msg: payload.msg
          },
          loading: false
        };
      }
    )

    .addCase(
      failedLoadingAction,
      (state: loaderReducerStateType, action: any) => {
        const { payload }: { payload: failedLoadingActionType } = action;
        state.loaders[payload.name] = {
          failure: {
            status: true,
            msg: payload.msg,
            id: payload?.id
          },
          loading: false
        };
      }
    )

    .addCase(
      removeLoaderAction,
      (state: loaderReducerStateType, action: any) => {
        const { payload }: { payload: removeLoaderActionType } = action;
        delete state.loaders[payload.name];
      }
    )
    .addCase(resetAllLoadersAction, resetState(initialState))
    .addCase(resetReducersAction, resetState(initialState))
})
