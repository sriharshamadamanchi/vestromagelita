import * as React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { CurvedButton, FTextInputWithLabel, Label, LoadingIndicator, PasswordField, PhoneNumber } from "../../common/components";
import { Formik } from "formik";
import { strings } from "../../common/i18n";
import { theme } from "../../common/theme";
import { moderateScale } from "react-native-size-matters";
import { useSelector } from "react-redux";
import { registrationValidationSchema } from "./validations";
import { storeType } from "../../common/store/types";
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE, TEXTFIELD_MAX_LENGTH } from "../../common/constants";
import { PrimaryView } from "../../common/components/PrimaryView/PrimaryView.android";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  scrollViewStyle: {
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(20)
  },
  labelStyle: {
    fontSize: theme.font.fontSizes.m,
    color: theme.colors.primary
  },
  textInputStyle: {
    fontSize: theme.font.fontSizes.xl,
    color: theme.colors.primary
  },
  textInputViewStyle: {
    marginBottom: moderateScale(20)
  },
  textInputWithLableStyle: {
    marginBottom: moderateScale(20)
  },
  curvedButtonStyle: {
    height: moderateScale(50),
    width: "100%",
    marginTop: moderateScale(30),
    marginBottom: moderateScale(20)
  },
  validationLabelStyle: {
    color: theme.colors.error,
    fontSize: theme.font.fontSizes.m
  },
  infostyle: {
    marginHorizontal: moderateScale(5),
    marginBottom: moderateScale(20)
  },
  refStyle: {
    width: moderateScale(1),
    height: moderateScale(1)
  }
});

export const Register = (): React.ReactNode => {
  const loading = useSelector((state: storeType): boolean => state.loader.loading);
  const confirmpassword: any = React.useRef("");

  return (
    <PrimaryView>
      <KeyboardAvoidingView
        keyboardVerticalOffset = {Platform.select({ ios: 100, android: moderateScale(100) })}
        behavior = {"padding"}
        style = {styles.container}
      >
        <View style = {styles.container}>
          <Formik
            initialValues = {{
              smsConsent: false,
              countryCode: DEFAULT_COUNTRY_CODE
            }}
            onSubmit = {() => {}}
            validationSchema = {registrationValidationSchema}
            validateOnMount
            validateOnBlur
            validateOnChange
            component = {({ handleChange, setFieldTouched, setFieldValue, handleBlur, touched, values, errors, isValid }: any) => {
              return (
                <ScrollView
                  contentContainerStyle = {{ paddingBottom: moderateScale(50) }}
                  style = {styles.scrollViewStyle}
                  keyboardShouldPersistTaps = "handled">
                  <LoadingIndicator color = {theme.colors.primary} loading = {loading} />

                  <FTextInputWithLabel
                    testID = "name"
                    accessibilityLabel = "name"
                    label = {strings("Register.given_name")}
                    maxLength = {TEXTFIELD_MAX_LENGTH}
                    error = {touched.given_name && errors.given_name}
                    value = {values.given_name}
                    onChangeText = {handleChange("given_name")}
                    onBlur = {handleBlur("given_name")}
                    textInputStyle = {styles.textInputStyle}
                    labelStyle = {styles.labelStyle}
                    viewStyle = {styles.textInputViewStyle}
                    validationLabelStyle = {styles.validationLabelStyle}
                  />

                  <PhoneNumber
                    testID = "phoneNumber"
                    accessibilityLabel = "phoneNumber"
                    phoneNumber = {values.phone}
                    countryCode = {values.countryCode}
                    value = {values.phone}
                    label = {strings("Register.phone")}
                    error = {touched.phone && errors.phone}
                    validationLabelStyle = {styles.validationLabelStyle}
                    viewStyle = {styles.textInputViewStyle}
                    keyboardType = {"number-pad"}
                    onPhoneNumberBlur = {handleBlur("phone")}
                    onPhoneNumberChange = {(newPhoneNumber: string) => {
                      setFieldValue("phone", newPhoneNumber, true);
                    }}
                    onCountryCodeChange = {((value: string) => {
                      setFieldValue("countryCode", value, true);
                      if (values.phone) {

                        /*
                         * because of below issue, I have used timer hack to retrigger validation
                         * https://github.com/formik/formik/issues/2059
                         */
                        setTimeout(() => setFieldTouched("phone", true));
                      }
                    })}
                    countryCodesData = {COUNTRY_CODES}
                  />

                  <FTextInputWithLabel
                    testID = "email"
                    accessibilityLabel = "email"
                    label = {strings("Register.email")}
                    error = {touched.email && errors.email}
                    value = {values.email}
                    autoCapitalize = "none"
                    onChangeText = {handleChange("email")}
                    onBlur = {handleBlur("email")}
                    textInputStyle = {styles.textInputStyle}
                    labelStyle = {styles.labelStyle}
                    viewStyle = {styles.textInputWithLableStyle}
                    validationLabelStyle = {styles.validationLabelStyle}
                    keyboardType = "email-address"
                  />

                  <PasswordField
                    testID = "password"
                    accessibilityLabel = "password"
                    label = {strings("Register.password")}
                    error = {touched.password && errors.password}
                    value = {values.password}
                    onChangeText = {handleChange("password")}
                    onBlur = {handleBlur("password")}
                    autoCapitalize = "none"
                    textInputStyle = {styles.textInputStyle}
                    labelStyle = {styles.labelStyle}
                    viewStyle = {styles.textInputViewStyle}
                    validationLabelStyle = {styles.validationLabelStyle}
                  />
                  <TextInput
                    value = {""}
                    onChange = {() => {

                    }}
                    onFocus = {() => {
                      console.log("confirmpassword", confirmpassword);
                      confirmpassword.current.focus();
                    }}
                    style = {styles.refStyle}
                  />

                  <PasswordField
                    testID = "confirmpassword"
                    accessibilityLabel = "confirmpassword"
                    label = {strings("Register.confirmpassword")}
                    error = {touched.confirmpassword && errors.confirmpassword}
                    value = {values.confirmpassword}
                    onChangeText = {handleChange("confirmpassword")}
                    onBlur = {handleBlur("confirmpassword")}
                    textInputStyle = {styles.textInputStyle}
                    autoCapitalize = "none"
                    labelStyle = {styles.labelStyle}
                    viewStyle = {styles.textInputWithLableStyle}
                    validationLabelStyle = {styles.validationLabelStyle}
                    myRef = {confirmpassword}
                  />
                  <Label m title = {strings("Register.passwordRequirements")} style = {styles.infostyle} />
                  <CurvedButton
                    testID = "register"
                    accessibilityLabel = "register"
                    disableButton = {(!isValid) || (!values.smsConsent)}
                    title = {strings("Register.register")}
                    buttonStyle = {styles.curvedButtonStyle}
                    events = {strings("Analytics.RegisterScreenRegister")}
                    onPress = {() => {

                    }}
                  />
                </ScrollView>
              );
            }} />
        </View>
      </KeyboardAvoidingView>
    </PrimaryView>
  );
};
