import { combineReducers } from "redux";
import { loaderReducer } from "../loaderRedux/reducer";
import { loginReducer } from "../../Authentication/redux/reducer";

export const reducers: any = combineReducers({
  loader: loaderReducer,
  login: loginReducer
});
