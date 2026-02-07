import React from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput, View } from "react-native";
import { ValidationErrorMessage } from "../ValidationErrorMessage/ValidationErrorMessage";
import RNPickerSelect from "react-native-picker-select";
import { theme } from "../../theme";
// @ts-ignore
import { Triangle } from "react-native-shapes";
import { moderateScale } from "react-native-size-matters";
import { FTextInputWithLabel } from "../FTextInputWithLabel/FTextInputWithLabel";
import { Label } from "../Label/Label";
import { ACCESSIBILITY_MAXIMUM_FONT_SIZE_SCALE } from "../../constants";
import Utility from "../../Utility";

type phoneNumberPropsType = {
  readonly viewStyle?: any,
  readonly label: string,
  readonly countryCodesData: Array<{
   label: string,
   value: string
  }>,
  readonly phoneNumber: string,
  readonly countryCode: string,
  readonly onCountryCodeChange: any,
  readonly onPhoneNumberChange: any,
  readonly placeholder?: string,
  readonly placeholderTextColor?: string,
  readonly onPhoneNumberBlur?: ()=>void,
  readonly keyboardType?: KeyboardTypeOptions | undefined,
  readonly textStyle?: any,
  readonly error?: string,
  readonly validationViewStyle?: any,
  readonly validationLabelStyle?: any,
  readonly testID?: string,
  readonly accessibilityLabel?: string,
  readonly value?: string
};

const doMask = (number: string, maskPattern: string) => {
  if (!number){
    return number;
  }

  const numberUnMasked = number.replace(/(\1)/g, "").replace( /[^\d]/g, "");
  let finalNumber = maskPattern;
  for (const digit of numberUnMasked) {
    finalNumber = finalNumber.replace("*", digit);
  }

  // remove unnecessary *
  if (finalNumber.indexOf("*") !== -1) {
    finalNumber = finalNumber.slice(0, finalNumber.indexOf("*"));
  }

  // if '-' comes in the end, then trim it.
  if (finalNumber.lastIndexOf("-") === finalNumber.length - 1) {
    finalNumber = finalNumber.slice(0, finalNumber.length - 1);
  }

  return finalNumber;
};

export const PhoneNumber = (props: phoneNumberPropsType): any => {
  if (props.countryCodesData.length > 1) {
    return ( <PhoneNumberWithDropDown {...props} />);
  }

  return ( <PhoneNumberWithoutDropDown {...props} />);

};

export const PhoneNumberWithoutDropDown = (props: phoneNumberPropsType): any => {
  return (
    <View style = {styles.containerStyle}>
      <FTextInputWithLabel
        testID = {props.testID}
        accessibilityLabel = {props.accessibilityLabel}
        label = {props.label}
        error = {props.error}
        value = {props.phoneNumber}
        onChangeText = {(newNumber: any) => {

          const { mask }: any = props.countryCodesData.filter((countryCodeObject: any) => {
            return countryCodeObject.value === `${props.countryCode}`;
          })[0];

          // Update masked number
          props.onPhoneNumberChange(doMask(newNumber, mask));
        }}
        onBlur = {props.onPhoneNumberBlur}
        textInputStyle = {[styles.textInputStyle, props.textStyle]}
        labelStyle = {styles.labelStyle}
        viewStyle = {[props.viewStyle]}
        validationLabelStyle = {styles.validationLabelStyle}
        keyboardType = {"phone-pad"}
      />
    </View>

  );
};

export const PhoneNumberWithDropDown = (props: phoneNumberPropsType): any => {

  return (
    <View>
      <Label title = {props.label} style = {styles.phoneText} />
      <View style = {{ ...props.viewStyle }}>
        <View style = {styles.borderStyle}>
          <View style = {styles.innerView}>
            <View style = {styles.pickerContainer}>
              <RNPickerSelect
                value = {props.countryCode}
                placeholder = {{}}
                onValueChange = {(newCountryCode: string) => {

                  /*
                   * Below if condition solves one bug
                   * It restrics onValueChange call on initialRender if we pass value prop
                   */

                  if (props.countryCode !== newCountryCode) {

                    props.onCountryCodeChange(newCountryCode);

                    // When country code changes update masking
                    const { mask }: any = props.countryCodesData.filter((countryCodeObject: any) => {
                      return countryCodeObject.value === `${newCountryCode}`;
                    })[0];
                    props.onPhoneNumberChange(doMask(props.phoneNumber, mask));

                  }
                }}
                useNativeAndroidPickerStyle = {false}
                pickerProps = {{
                  itemStyle: {
                    fontSize: theme.font.fontSizes.xl20
                  }
                }}
                style = {pickerSelectStyles}
                items = {props.countryCodesData}
                Icon = {() => {
                  return (<View style = {styles.chevronStyle}>
                    <Triangle type = "isosceles" size = {moderateScale(1)} color = {theme.colors.primary} />
                  </View>);
                }}
              />
            </View>
            <View style = {styles.seperator} />

            <TextInput maxFontSizeMultiplier = {ACCESSIBILITY_MAXIMUM_FONT_SIZE_SCALE}
              placeholder = {props.placeholder}
              placeholderTextColor = {props.placeholderTextColor ?? theme.colors.primary}
              onChangeText = {(newNumber: string) => {
                const { mask }: any = props.countryCodesData.filter((countryCodeObject: any) => {
                  return countryCodeObject.value === `${props.countryCode}`;
                })[0];

                // Update masked number
                props.onPhoneNumberChange(doMask(newNumber, mask));
              }}
              onBlur = {props.onPhoneNumberBlur}
              value = {props.phoneNumber}
              selectionColor = {theme.colors.primary}
              keyboardType = {props.keyboardType}
              style = {[styles.textStyle, props.textStyle]}

            />
          </View>

        </View>
        {Utility.isNotEmpty(props.error) && (
          <ValidationErrorMessage
            validationViewStyle = {props.validationViewStyle}
            validationLabelStyle = {props.validationLabelStyle}
            error = {props.error} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chevronStyle: {
    transform: [{ rotate: "180deg" }],
    marginRight: moderateScale(15)
  },
  pickerContainer: {
    flex: 1,
    justifyContent: "center"
  },
  seperator: {
    marginVertical: moderateScale(10),
    borderRadius: moderateScale(200),
    borderWidth: 1,
    width: moderateScale(2.2),
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary
  },
  borderStyle: {
    flex: 1,
    borderRadius: moderateScale(10),
    borderWidth: 1,
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.primary
  },
  textStyle: {
    flex: 2.5,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.background,
    height: moderateScale(50),
    paddingHorizontal: moderateScale(10),
    fontSize: theme.font.fontSizes.xl,
    color: theme.colors.primary,
    fontFamily: theme.font.fontFamily.medium,
    borderRadius: moderateScale(10)
  },
  innerView: {
    flexDirection: "row"
  },
  phoneText: {
    marginBottom: moderateScale(10),
    fontSize: theme.font.fontSizes.m,
    color: theme.colors.primary,
    fontFamily: theme.font.fontFamily.medium
  },
  labelStyle: {
    fontSize: theme.font.fontSizes.m,
    color: theme.colors.primary
  },
  textInputStyle: {
    fontSize: theme.font.fontSizes.xl,
    color: theme.colors.primary
  },
  validationLabelStyle: {
    color: theme.colors.error,
    fontSize: theme.font.fontSizes.m
  },
  containerStyle: {
    marginBottom: moderateScale(15)
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: theme.font.fontSizes.xl,
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(5),
    alignSelf: "center",
    backgroundColor: theme.colors.background,
    borderRadius: moderateScale(10),
    color: theme.colors.primary,
    paddingRight: 30, // to ensure the text is never behind the icon
    fontFamily: theme.font.fontFamily.medium
  },
  inputAndroid: {
    fontSize: theme.font.fontSizes.xl,
    paddingHorizontal: moderateScale(5),
    paddingVertical: moderateScale(12),
    backgroundColor: theme.colors.background,
    alignSelf: "center",
    borderRadius: moderateScale(10),
    color: theme.colors.primary,
    fontFamily: theme.font.fontFamily.medium,
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroidContainer: {
    justifyContent: "center"
  },
  headlessAndroidPicker: {
    width: "150%"
  },
  inputIOSContainer: {
    justifyContent: "center"
  },
  done: {
    fontSize: theme.font.fontSizes.l
  },
  doneDepressed: {
    fontSize: theme.font.fontSizes.l
  }
});
