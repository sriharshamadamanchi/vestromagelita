import * as React from "react";
import { SafeAreaView } from "react-native";
import { theme } from "../../../theme";

interface safeViewRendererPropsType {
  readonly children: any,
  readonly safeAreaTopColor?: "default" | "base" | "primary" | "light" | "transparent",
  readonly safeAreaBottomColor?: "default" | "base" | "primary" | "transparent"
};

export const SafeViewRenderer = ({ children, safeAreaTopColor, safeAreaBottomColor }: safeViewRendererPropsType): any => {

  const topContinerStyle = { backgroundColor: theme.colors.onPrimary };
  const bottomContainerStyle = { flex: 1, backgroundColor: theme.colors.onPrimary };

  switch (safeAreaTopColor) {
  case "primary":
    topContinerStyle.backgroundColor = theme.colors.primary;
    break;
  case "base":
    topContinerStyle.backgroundColor = theme.colors.primary;
    break;
  case "light":
    topContinerStyle.backgroundColor = theme.colors.onPrimary;
    break;
  case "transparent":
    topContinerStyle.backgroundColor = "transparent";
    break;
  case "default":
  default:
    topContinerStyle.backgroundColor = theme.colors.onPrimary;
  }

  switch (safeAreaBottomColor) {
  case "primary":
    bottomContainerStyle.backgroundColor = theme.colors.primary;
    break;
  case "base":
    bottomContainerStyle.backgroundColor = theme.colors.primary;
    break;
  case "transparent":
    bottomContainerStyle.backgroundColor = "transparent";
    break;
  case "default":
  default:
    bottomContainerStyle.backgroundColor = theme.colors.onPrimary;
  }

  return (
    <>
      <SafeAreaView style = {topContinerStyle} />
      <SafeAreaView style = {bottomContainerStyle} >
        {children}

      </SafeAreaView>
    </>
  );
};
