import * as React from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { ValidationErrorMessage } from "../ValidationErrorMessage/ValidationErrorMessage";
import { theme } from "../../theme";
import ShowPassword from "../../theme/icons/show-password.svg";
import HidePassword from "../../theme/icons/hide-password.svg";
import { ACCESSIBILITY_MAXIMUM_FONT_SIZE_SCALE } from "../../constants";
import Utility from "../../Utility";

const styles = StyleSheet.create({
  viewStyle: {
    // flex:1
  },
  labelStyle: {
    marginBottom: moderateScale(10),
    fontSize: theme.font.fontSizes.l,
    color: theme.colors.secondary,
    fontFamily: theme.font.fontFamily.medium
  },
  textInputStyle: {
    flex: 1,
    height: moderateScale(50),
    fontSize: theme.font.fontSizes.l,
    fontFamily: theme.font.fontFamily.medium,
    color: theme.colors.primary
  },
  eyeButtonStyle: {
    padding: moderateScale(6)
  },
  showOrHide: {
    backgroundColor: theme.colors.background,
    borderRadius: moderateScale(10),
    height: moderateScale(50),
    paddingHorizontal: moderateScale(10),
    fontSize: theme.font.fontSizes.l,
    fontFamily: theme.font.fontFamily.medium,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    flexDirection: "row",
    alignItems: "center"
  }
});

type passwordFieldType = {
  readonly viewStyle?: any,
  readonly textInputStyle?: any,
  readonly labelStyle?: any,
  readonly validationViewStyle?: any,
  readonly validationLabelStyle?: any,
  readonly label?: string,
  readonly value?: string,
  readonly error?: string,
  readonly validate?: ()=>string,
  readonly placeholder?: string,
  readonly onChangeText?: ()=>void,
  readonly onBlur?: ()=>void,
  readonly placeholderTextColor?: string,
  readonly keyboardType?: KeyboardTypeOptions | undefined,
  readonly autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined,
  readonly maxLength?: number,
  readonly editable?: boolean,
  readonly icon?: any,
  readonly testID?: string,
  readonly accessibilityLabel?: string,
  readonly myRef?: any
};

export const PasswordField: any = React.memo<passwordFieldType>((props: passwordFieldType): React.ReactNode => {

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  return (
    <View style = {[styles.viewStyle, props.viewStyle]}>
      {
        props.label
          ?
          <Text maxFontSizeMultiplier = {ACCESSIBILITY_MAXIMUM_FONT_SIZE_SCALE} style = {{ ...styles.labelStyle, ...props.labelStyle }}>
            {props.label}
          </Text>
          :
          null
      }

      <View style = {styles.showOrHide}>
        <TextInput maxFontSizeMultiplier = {ACCESSIBILITY_MAXIMUM_FONT_SIZE_SCALE}
          editable = {props.editable}
          maxLength = {props.maxLength}
          style = {[styles.textInputStyle, props.textInputStyle]}
          placeholder = {props.placeholder}
          placeholderTextColor = {props.placeholderTextColor ?? theme.colors.secondary}
          onChangeText = {props.onChangeText}
          onBlur = {props.onBlur}
          value = {props.value}
          secureTextEntry = {secureTextEntry}
          selectionColor = {theme.colors.secondary}
          keyboardType = {props.keyboardType}
          autoCapitalize = {props.autoCapitalize}
          testID = {props.testID}
          accessibilityLabel = {props.accessibilityLabel}
          ref = {props.myRef}

        />
        <TouchableOpacity style = {styles.eyeButtonStyle} onPress = {() => setSecureTextEntry(!secureTextEntry)}>
          {
            secureTextEntry ? <ShowPassword width = {moderateScale(24)} height = {moderateScale(14)} /> : <HidePassword width = {moderateScale(24)} height = {moderateScale(18)} />
          }
        </TouchableOpacity>
      </View>

      {Utility.isNotEmpty(props.error) && (
        <ValidationErrorMessage
          validationViewStyle = {props.validationViewStyle}
          validationLabelStyle = {props.validationLabelStyle}
          error = {props.error} />
      )}
    </View>
  );
});
