import React from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native"
import { AnchorButton, CurvedButton, Label, LoadingIndicator, Wave } from "../../common/components"
import { moderateScale } from "react-native-size-matters"
import { useNavigation } from "@react-navigation/native"
import { LoginOrRegisterScreenNavigationProp } from "../../common/navigation/types"
import { FTextInputWithLabel } from "../../common/components/FTextInputWithLabel/FTextInputWithLabel"
import { theme } from "../../common/theme"
import { PasswordField } from "../../common/components/PasswordField/PasswordField"
import * as Yup from "yup";
import { Formik } from "formik";
import { strings } from "../../common/i18n"
import { useDispatch, useSelector } from "react-redux"
import { loaderSelector } from "../../common/loaderRedux/selectors"
import { loginAction } from "../redux/actions"

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.background
  },
  labelStyle: {
    marginVertical: moderateScale(5)
  },
  subContainer: {
    flex: 1,
    margin: moderateScale(20)
  },
  placeholderLabel1Style: {
    marginTop: moderateScale(30),
    fontSize: theme.font.fontSizes.xl,
    color: theme.colors.primary
  },
  validationLabelStyle: {
    color: theme.colors.error
  },
  fTextInputStyle: {
    color: theme.colors.primary,
    paddingHorizontal: moderateScale(12)
  },
  emailFTextInputViewStyle: {
    marginBottom: moderateScale(30)
  },
  placeholderLabel2Style: {
    fontSize: theme.font.fontSizes.xl,
    color: theme.colors.primary
  },
  singleButtonStyle: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: moderateScale(5),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(20)
  },
  curvedButtonStyle: {
    height: moderateScale(50),
    width: "100%",
    marginTop: moderateScale(10),
    marginBottom: moderateScale(20)
  },
  registerAnchorViewStyle: {
    alignItems: "center",
    marginVertical: moderateScale(20)
  },
  dontHaveAnAccountLabelStyle: {
    marginBottom: moderateScale(5)
  }
})

const Login = () => {
  const navigation = useNavigation<LoginOrRegisterScreenNavigationProp>()
  const dispatch = useDispatch()

  const { loading }: { loading: boolean } = useSelector(loaderSelector("Login"))

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset = {Platform.select({ ios: 100, android: 0 })}
      behavior = "padding"
      style = {styles.container}>
      <ScrollView style = {styles.container} keyboardShouldPersistTaps = "handled">
        <Wave
          count = {2}
          waveHeight = {100}
          height = {300}
          colors = {["#0C7779", "#005461"]}
          style = {{
            transform: [{ rotate: "180deg" }]
          }}
        />
        <View style = {styles.subContainer}>
          <Label center xxxl title = "Welcome Back !" style = {styles.labelStyle} />

          <Formik
            initialValues = {{ email: "", password: "" }}
            onSubmit = {() => { }}
            validationSchema = {
              Yup.object().shape({
                email: Yup.string().required(strings("required")).email(strings("Login.enterValidEmail")),
                password: Yup.string().required(strings("required"))
              })
            }
            validateOnMount
            validateOnBlur
            validateOnChange
            component = {({ handleChange, handleBlur, touched, values, errors, isValid }: any) => {
              return (
                <>
                  <LoadingIndicator color = {theme.colors.primary} loading = {loading} />
                  <View style = {styles.container}>
                    <FTextInputWithLabel
                      testID = "email"
                      accessibilityLabel = "email"
                      label = {strings("Login.email")}
                      labelStyle = {styles.placeholderLabel1Style}
                      onChangeText = {handleChange("email")}
                      onBlur = {handleBlur("email")}
                      error = {touched.email && errors.email}
                      value = {values.email}
                      keyboardType = "email-address"
                      autoCapitalize = "none"
                      validationLabelStyle = {styles.validationLabelStyle}
                      textInputStyle = {styles.fTextInputStyle}
                      viewStyle = {styles.emailFTextInputViewStyle}
                    />

                    <PasswordField
                      testID = "password"
                      accessibilityLabel = "password"
                      label = {strings("Login.password")}
                      labelStyle = {styles.placeholderLabel2Style}
                      onChangeText = {handleChange("password")}
                      onBlur = {handleBlur("password")}
                      error = {touched.password && errors.password}
                      value = {values.password}
                      autoCapitalize = "none"
                      validationLabelStyle = {styles.validationLabelStyle}
                    />
                    <View style = {styles.singleButtonStyle}>
                      <AnchorButton
                        testID = "forgotPassword"
                        accessibilityLabel = "forgotPassword"
                        m
                        underline = {false}
                        title = {strings("Login.forgotPassword")}
                        onPress = {() => {
                          navigation.navigate("ForgotPassword");
                        }}
                      />
                    </View>
                    <CurvedButton
                      testID = "login"
                      accessibilityLabel = "login"
                      disableButton = {(!isValid) || loading}
                      title = {strings("Login.login")}
                      buttonStyle = {styles.curvedButtonStyle}
                      events = {strings("Analytics.LoginWithEmail")}
                      onPress = {() => {
                        if (isValid) {
                          dispatch(loginAction({}));
                        }
                      }}
                    />

                    <View style = {styles.registerAnchorViewStyle}>
                      <Label style = {styles.dontHaveAnAccountLabelStyle} center primary title = {strings("Login.dontHaveAnAccount")} />

                      <AnchorButton
                        testID = "registerButton"
                        accessibilityLabel = "registerButton"
                        title = {strings("Login.register")}
                        onPress = {() => {
                          navigation.navigate("Register");
                        }}
                      />

                    </View>
                  </View>
                </>
              );
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Login
