import * as React from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton as PaperRadioButton, useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  containerStyle: {
    transform: [{ scale: 1.2 }]
  }
});

type RadioButtonProps = {
  readonly value: string,
  readonly checked?: string,
  readonly disabled?: boolean,
  readonly onPress?: () => void,
  readonly containerStyle?: any,
  readonly testID?: string
};

export const RadioButton = ({ value, disabled, checked, onPress = () => { }, containerStyle = {}, testID }: RadioButtonProps) => {

  const mTheme = useTheme()

  return (
    <View style = {[styles.containerStyle, containerStyle]}>
      <PaperRadioButton.Android
        value = {value}
        status = {checked === value ? "checked" : "unchecked"}
        disabled = {disabled}
        onPress = {onPress}
        uncheckedColor = {mTheme.colors.primary}
        testID = {testID}
      />
    </View>
  );
};
