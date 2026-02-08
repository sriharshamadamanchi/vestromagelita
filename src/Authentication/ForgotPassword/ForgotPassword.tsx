import React from "react"
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native"
import { CurvedButton, LoadingIndicator } from "../../common/components"
import { moderateScale } from "react-native-size-matters"
import { FTextInputWithLabel } from "../../common/components/FTextInputWithLabel/FTextInputWithLabel"
import { theme } from "../../common/theme"
import * as Yup from "yup";
import { Formik } from "formik";
import { strings } from "../../common/i18n"
import { useDispatch, useSelector } from "react-redux"
import { loaderSelector } from "../../common/loaderRedux/selectors"
import { forgotPasswordAction } from "../redux/actions"

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center"
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
  curvedButtonStyle: {
    height: moderateScale(50),
    width: "100%",
    marginTop: moderateScale(10),
    marginBottom: moderateScale(20)
  }
})

const ForgotPassword = () => {

  const { loading }: { loading: boolean } = useSelector(loaderSelector("ForgotPassword"))
  const dispatch = useDispatch()

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset = {Platform.select({ ios: 100, android: 0 })}
      behavior = "padding"
      style = {styles.container}>
      <View style = {styles.subContainer}>

        <Formik
          initialValues = {{ email: "" }}
          onSubmit = {() => { }}
          validationSchema = {
            Yup.object().shape({
              email: Yup.string().required(strings("required")).email(strings("Login.enterValidEmail"))
            })
          }
          validateOnMount
          validateOnBlur
          validateOnChange
          component = {({ handleChange, handleBlur, touched, values, errors, isValid, resetForm }: any) => {
            return (
              <>
                <LoadingIndicator color = {theme.colors.primary} loading = {loading} />
                <View style = {styles.container}>
                  <FTextInputWithLabel
                    testID = "email"
                    accessibilityLabel = "email"
                    label = {"Enter your email address to receive a password reset link"}
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
                  <CurvedButton
                    testID = "submit"
                    accessibilityLabel = "submit"
                    disableButton = {(!isValid) || loading}
                    title = {"Submit"}
                    buttonStyle = {styles.curvedButtonStyle}
                    onPress = {() => {
                      resetForm()
                      dispatch(forgotPasswordAction({ email: values.email }))
                    }}
                  />
                </View>
              </>
            );
          }}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default ForgotPassword
