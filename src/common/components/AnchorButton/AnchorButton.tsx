import React from "react";
import { theme } from "../../theme";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ACCESSIBILITY_MAXIMUM_FONT_SIZE_SCALE } from "../../constants";

const styles = StyleSheet.create({
  buttonStyle: {
  },
  textStyle: {
    color: theme.colors.primary
  },
  underLineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary
  }
});
interface anchorButtonType {
  readonly title: string,
  readonly underline?: boolean,
  readonly buttonStyle?: any,
  readonly textStyle?: any,
  readonly underLineStyleProp?: any,
  readonly events?: string,
  readonly onPress?: () => any,
  readonly light?: boolean,
  readonly regular?: boolean,
  readonly medium?: boolean,
  readonly semibold?: boolean,
  readonly bold?: boolean,
  readonly xs?: boolean,
  readonly s?: boolean,
  readonly m?: boolean,
  readonly l?: boolean,
  readonly xl?: boolean,
  readonly xxl?: boolean,
  readonly testID?: string,
  readonly disabled?: boolean,
  readonly accessibilityLabel?: string
};

export const AnchorButton = ({
  title,
  underline = true,
  buttonStyle,
  textStyle,
  underLineStyleProp,
  onPress = () => {
  },
  light,
  regular,
  medium,
  semibold,
  bold,
  xs,
  s,
  m,
  l,
  xl,
  xxl,
  testID,
  disabled,
  accessibilityLabel
}: anchorButtonType): any => {
  // Default style

  const newStyle = {
    fontSize: theme.font.fontSizes.l,
    fontFamily: theme.font.fontFamily.medium
  };

  // Set font Style
  light && (newStyle.fontFamily = theme.font.fontFamily.light);
  regular && (newStyle.fontFamily = theme.font.fontFamily.regular);
  medium && (newStyle.fontFamily = theme.font.fontFamily.medium);
  semibold && (newStyle.fontFamily = theme.font.fontFamily.semibold);
  bold && (newStyle.fontFamily = theme.font.fontFamily.bold);

  // Easily Set Font Sizes
  xs && (newStyle.fontSize = theme.font.fontSizes.xs);
  s && (newStyle.fontSize = theme.font.fontSizes.s);
  m && (newStyle.fontSize = theme.font.fontSizes.m);
  l && (newStyle.fontSize = theme.font.fontSizes.l);
  xl && (newStyle.fontSize = theme.font.fontSizes.xl);
  xxl && (newStyle.fontSize = theme.font.fontSizes.xxl);

  const underLineStyle = underline === true ? { ...styles.underLineStyle, ...underLineStyleProp } : {};
  const disableButtonStyle = disabled === true ? { opacity: 0.35 } : {};

  return (
    <TouchableOpacity
      disabled = {disabled}
      testID = {testID}
      accessibilityLabel = {accessibilityLabel}
      style = {{ ...underLineStyle, ...styles.buttonStyle, ...buttonStyle, ...disableButtonStyle }}
      onPress = {() => {
        onPress();
      }}
    >
      <Text maxFontSizeMultiplier = {ACCESSIBILITY_MAXIMUM_FONT_SIZE_SCALE} style = {{ ...styles.textStyle, ...newStyle, ...textStyle }} >{title}</Text>
    </TouchableOpacity>
  );
};
