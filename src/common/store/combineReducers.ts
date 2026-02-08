import { combineReducers } from "redux";
import { loaderReducer } from "../loaderRedux/reducer";
import { loginReducer } from "../../Authentication/redux/reducer";
import { homeReducer } from "../../Home/redux/reducer";

export const reducers: any = combineReducers({
  loader: loaderReducer,
  login: loginReducer,
  home: homeReducer
});
