import * as React from "react";
import { StyleSheet, View } from "react-native";
import { FocusAwareStatusBar } from "./FocusAwareStatusBar/FocusAwareStatusBar";
import { theme } from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary
  }
});

interface primaryViewPropsType {
  readonly children: any,
  readonly barStyle?: "light-content" | "dark-content",
  readonly hideSafeViewRenderer?: boolean,
  readonly offlineBannerStyle?: any,
  readonly safeAreaTopColor?: "default" | "base" | "primary",
  readonly safeAreaBottomColor?: "default" | "base" | "primary",
  readonly defaultColor?: boolean
};

export const PrimaryView = ({ children, barStyle = "dark-content", defaultColor = false }: primaryViewPropsType) => {

  return (
    <View style = {styles.container}>
      <FocusAwareStatusBar barStyle = {barStyle} defaultColor = {defaultColor} />
      {children}
    </View>
  );

};
