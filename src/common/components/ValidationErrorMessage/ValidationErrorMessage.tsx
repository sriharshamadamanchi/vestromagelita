import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { ACCESSIBILITY_MAXIMUM_FONT_SIZE_SCALE } from "../../constants";
import { theme } from "../../theme";

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: moderateScale(5),
    marginLeft: moderateScale(5)
  },
  labelStyle: {
    fontSize: theme.font.fontSizes.m,
    color: theme.colors.error,
    fontFamily: theme.font.fontFamily.medium
  }
});

  type validationErrorMessageType = {
    readonly style?: any,
    readonly validationViewStyle?: any,
    readonly validationLabelStyle?: any,
    readonly error: any
  };
export const ValidationErrorMessage = (props: validationErrorMessageType): React.ReactNode => {
  if (props.error) {
    return (
      <View style = {[styles.viewStyle, props.validationViewStyle]}>
        <Text maxFontSizeMultiplier = {ACCESSIBILITY_MAXIMUM_FONT_SIZE_SCALE} style = {{ ...styles.labelStyle, ...props.validationLabelStyle }}>
          {`• ${props.error}`}
        </Text>
      </View>
    );
  }

  return null;

};
