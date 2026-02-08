import { call, put, takeLatest } from "redux-saga/effects";
import { failedLoadingAction, startLoadingAction, successLoadingAction } from "../../common/loaderRedux/actions";
import { clearLoginDetailsAction, forgotPasswordAction, loggedInSuccessfullyAction, loginAction, logoutAction, registerAction, storeLoginDetailsAction } from "./actions";
import { getAuth } from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { navigate } from "../../common/navigation/navigationService";

export function *loginSaga(action: { payload: { email: string, password: string } }): any {
  const { email, password } = action.payload
  const auth = getAuth()
  try {
    yield put(startLoadingAction({ name: "Login" }))
    yield call([auth, auth.signInWithEmailAndPassword], email, password)
    const userInfo = auth.currentUser
    console.log("userInfo", userInfo)
    if (!userInfo?.emailVerified) {
      throw new Error("Email is not verified")
    }
    yield put(storeLoginDetailsAction({ id: userInfo.uid, email, name: userInfo?.displayName || "" }))
    yield put(loggedInSuccessfullyAction())
    yield put(successLoadingAction({ name: "Login", msg: "" }))
  } catch (error: any) {
    console.log("error in loginSaga", error.message)
    if (error.code === "auth/user-not-found") {
      Alert.alert("User not found", "There is no user record corresponding to this identifier. The user may have been deleted.")
    } else if (error.code === "auth/invalid-credential") {
      Alert.alert("Invalid credentails", "Invalid email or password")
    } else if (error.code === "auth/wrong-password") {
      Alert.alert("Invalid password", "The password is invalid or the user does not have a password.")
    } else if (error.code === "auth/invalid-email") {
      Alert.alert("Alert", "Invalid email")
    } else if (error.message === "Email is not verified") {
      Alert.alert("Email is not verified", "Do you want to get verification link ?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes", onPress: async () => {
            try {
              await auth.currentUser?.sendEmailVerification()
              Alert.alert("Success", "A verification link has been sent to your email account. Please verify your email to continue")
            } catch (err: any) {
              if (err.code === "auth/too-many-requests") {
                Alert.alert("Too many requests", "We have blocked all requests from this device due to unusual activity. Try again later.")
              }
            }
          }
        }
      ]);
    }
    yield put(failedLoadingAction({ name: "Login", msg: "" }))
  }
}

export function *registerSaga(action: { payload: { name: string, email: string, password: string } }): any {
  const { name, email, password } = action.payload
  const auth = getAuth()
  try {
    yield put(startLoadingAction({ name: "Register" }))
    yield call([auth, auth.createUserWithEmailAndPassword], email, password)
    yield put(successLoadingAction({ name: "Register", msg: "" }))
    Alert.alert("Verification Pending", "A verification link has been sent to your email account. Please verify your email to continue")
    navigate("Login", { email, password })
  } catch (error: any) {
    console.log("error in registerSaga", error.message)
    if (error.code === "auth/email-already-in-use") {
      Alert.alert("Alert", "Email is already in use")
    } else if (error.code === "error.code === 'auth/invalid-email'"){
      Alert.alert("Alert", "Invalid Email")
    } else if (error.message) {
      Alert.alert("Alert", error.message)
    }
    yield put(failedLoadingAction({ name: "Register", msg: "" }))
  }
}

export function *forgotPasswordSaga(action: { payload: { email: string } }): any {
  const { email } = action.payload
  const auth = getAuth()
  try {
    yield put(startLoadingAction({ name: "ForgotPassword" }))
    yield call([auth, auth.sendPasswordResetEmail], email)
    Alert.alert("Success", "A reset link has been sent to your email acount.")
    yield put(successLoadingAction({ name: "ForgotPassword", msg: "" }))
  } catch (error: any) {
    console.log("error in forgotPasswordSaga", error.message)
    if (error.code === "auth/user-not-found") {
      Alert.alert("User not found", "There is no user record corresponding to this identifier. The user may have been deleted.")
    } else if (error.code === "auth/too-many-requests") {
      Alert.alert("Too many requests", "We have blocked all requests from this device due to unusual activity. Try again later.")
    } else if (error.message) {
      Alert.alert("Alert", error.message)
    }
    yield put(failedLoadingAction({ name: "ForgotPassword", msg: "" }))
  }
}

export function *logoutSaga(action: { payload: { deleteAccount: boolean } }): any {
  const { deleteAccount = false } = action?.payload ?? {}
  const auth = getAuth()
  try {
    yield put(startLoadingAction({ name: "Logout" }))
    yield call([auth, auth.signOut])

    yield put(clearLoginDetailsAction())
    yield put(successLoadingAction({ name: "Logout", msg: "" }))
  } catch (error: any) {
    console.log("error in logoutSaga", error)
    if (!deleteAccount) {
      yield put(clearLoginDetailsAction())
    }
    yield put(failedLoadingAction({ name: "Logout", msg: "" }))
  }
}

const loginSagas = [
  takeLatest(loginAction, loginSaga),
  takeLatest(registerAction, registerSaga),
  takeLatest(logoutAction, logoutSaga),
  takeLatest(forgotPasswordAction, forgotPasswordSaga)
]

export default loginSagas
