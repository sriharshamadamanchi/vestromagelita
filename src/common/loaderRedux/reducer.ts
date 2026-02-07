import { failedLoadingAction, type failedLoadingActionType, hideLoaderAction, removeLoaderAction, type removeLoaderActionType, resetAllLoadersAction, resetReducersAction, showLoaderAction, startLoadingAction, type startLoadingActionType, successLoadingAction, type successLoadingActionType } from "./actions";
import { createReducer, resetState } from "../store/typeSafe";
import { loaderReducerStateType } from "../store/types";

const initialState = {
  loading: false,
  loaders: {}
};

export const loaderReducer = createReducer(initialState)
  .handleAction(
    showLoaderAction,
    (state: loaderReducerStateType) => {
      state.loading = true;
    }
  )
  .handleAction(
    hideLoaderAction,
    (state: loaderReducerStateType) => {
      state.loading = false;
    }
  )

  .handleAction(
    startLoadingAction,
    (state: loaderReducerStateType, action: any) => {
      const { payload }: { payload: startLoadingActionType } = action;
      state.loaders[payload.name] = {
        loading: true,
        msg: payload?.msg
      };
    }
  )

  .handleAction(
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

  .handleAction(
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

  .handleAction(
    removeLoaderAction,
    (state: loaderReducerStateType, action: any) => {
      const { payload }: { payload: removeLoaderActionType } = action;
      delete state.loaders[payload.name];
    }
  )
  .handleAction(resetAllLoadersAction, resetState(initialState))
  .handleAction(resetReducersAction, resetState(initialState));

