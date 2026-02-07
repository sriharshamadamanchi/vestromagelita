import { put, takeLatest } from "redux-saga/effects";
import { failedLoadingAction, startLoadingAction, successLoadingAction } from "../../common/loaderRedux/actions";
import { getActionType } from "../../common/store/typeSafe";
import { loggedInSuccessfullyAction, loginAction, logoutAction, registerAction } from "./actions";

export function *loginSaga(action: { payload: any }) {
  try {
    yield put(startLoadingAction({ name: "Login", msg: "pending" }));
    yield put(loggedInSuccessfullyAction())
    yield put(successLoadingAction({ name: "Login", msg: "success" }));
  } catch (error: any) {
    console.log("error in loginSaga", error);
    yield put(failedLoadingAction({ name: "Login", msg: "failure" }));
  }
}

export function *registerSaga(action: { payload: any }) {
  try {
    yield put(startLoadingAction({ name: "Register", msg: "pending" }));

    yield put(successLoadingAction({ name: "Register", msg: "success" }));
  } catch (error: any) {
    console.log("error in registerSaga", error);
    yield put(failedLoadingAction({ name: "Register", msg: "failure" }));
  }
}

export function *logoutSaga(action: { payload: any }) {
  try {
    yield put(startLoadingAction({ name: "Logout", msg: "pending" }));

    yield put(successLoadingAction({ name: "Logout", msg: "success" }));
  } catch (error: any) {
    console.log("error in logoutSaga", error);
    yield put(failedLoadingAction({ name: "Logout", msg: "failure" }));
  }
}

const loginSagas = [
  takeLatest(getActionType(loginAction), loginSaga),
  takeLatest(getActionType(registerAction), registerSaga),
  takeLatest(getActionType(logoutAction), logoutSaga)
]

export default loginSagas
