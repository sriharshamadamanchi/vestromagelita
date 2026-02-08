import { all } from "redux-saga/effects";
import loginSagas from "../../Authentication/redux/sagas";
import homeSagas from "../../Home/redux/sagas";

export function *sagas () {
  yield all([...loginSagas, ...homeSagas]);
}
