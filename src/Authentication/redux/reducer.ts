import { resetReducersAction } from "../../common/loaderRedux/actions";
import { loginReducerStateType } from "../../common/store/types";
import { createReducer, resetState } from "../../common/store/typeSafe";
import { loggedInSuccessfullyAction } from "./actions";

const initialState = {
  loggedIn: false,
  fcmToken: "",
  deviceToken: ""
};

export const loginReducer = createReducer(initialState)
  .handleAction(
    loggedInSuccessfullyAction,
    (state: loginReducerStateType) => {
      state.loggedIn = true;
    }
  )
  .handleAction(resetReducersAction, resetState(initialState));
