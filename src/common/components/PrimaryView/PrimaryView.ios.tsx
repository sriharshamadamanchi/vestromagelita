import * as React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../theme";
import { FocusAwareStatusBar } from "./FocusAwareStatusBar/FocusAwareStatusBar";
import { SafeViewRenderer } from "./SafeViewRenderer/SafeViewRenderer";

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
  readonly safeAreaTopColor?: "default" | "base" | "primary" | "light",
  readonly safeAreaBottomColor?: "default" | "base" | "primary",
  readonly defaultColor?: boolean
};

export const PrimaryView = ({ children, safeAreaTopColor, safeAreaBottomColor, offlineBannerStyle, hideSafeViewRenderer = false, barStyle = "dark-content", defaultColor = false }: primaryViewPropsType) => {

  if (hideSafeViewRenderer) {
    return (
      <View style = {styles.container}>
        <FocusAwareStatusBar barStyle = {barStyle} defaultColor = {defaultColor} />
        {children}
      </View>
    );
  }

  return (
    <SafeViewRenderer safeAreaTopColor = {safeAreaTopColor} safeAreaBottomColor = {safeAreaBottomColor} >
      <View style = {styles.container}>
        <FocusAwareStatusBar barStyle = {barStyle} defaultColor = {defaultColor} />
        {children}
      </View>
    </SafeViewRenderer>
  );
};
