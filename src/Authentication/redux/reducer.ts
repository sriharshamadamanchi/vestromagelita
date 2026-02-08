import { resetReducersAction } from "../../common/loaderRedux/actions";
import { loginReducerStateType } from "../../common/store/types";
import { createReducer, resetState } from "../../common/store/typeSafe";
import { clearLoginDetailsAction, loggedInSuccessfullyAction, storeLoginDetailsAction } from "./actions";

const initialState = {
  loggedIn: false,
  user: {}
};

export const loginReducer = createReducer(initialState)
  .handleAction(
    loggedInSuccessfullyAction,
    (state: loginReducerStateType) => {
      state.loggedIn = true;
    }
  )
  .handleAction(
    storeLoginDetailsAction,
    (state: any, action: any) => {
      state.isLoggedIn = true
      state.user = action.payload.user
    }
  )
  .handleAction(
    clearLoginDetailsAction,
    (state: any) => {
      state.isLoggedIn = false
      state.user = {}
    }
  )
  .handleAction(resetReducersAction, resetState(initialState));
