import { createReducer } from "@reduxjs/toolkit";
import { resetReducersAction } from "../../common/loaderRedux/actions";
import { loginReducerStateType } from "../../common/store/types";
import { resetState } from "../../common/store/typeSafe";
import { clearLoginDetailsAction, loggedInSuccessfullyAction, storeLoginDetailsAction } from "./actions";

const initialState = {
  loggedIn: false,
  user: {
    email: "",
    name: "",
    id: ""
  }
};

export const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      loggedInSuccessfullyAction,
      (state: loginReducerStateType) => {
        state.loggedIn = true;
      }
    )
    .addCase(
      storeLoginDetailsAction,
      (state: any, action: any) => {
        state.isLoggedIn = true
        state.user = action.payload
      }
    )
    .addCase(
      clearLoginDetailsAction,
      (state: any) => {
        state.isLoggedIn = false
        state.user = initialState.user
      }
    )
    .addCase(resetReducersAction, resetState(initialState));

})
