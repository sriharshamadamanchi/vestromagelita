import * as React from "react";
import { StyleSheet } from "react-native";
import { ProgressBar as PaperProgressBar } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    width: moderateScale(150),
    height: moderateScale(5),
    borderRadius: moderateScale(5)
  },
  fillStyle: {
    borderRadius: moderateScale(5)
  }
});

type ProgressBarProps = {
    readonly progress: number,
    readonly style?: any,
    readonly fillStyle?: any,
    readonly indeterminate?: boolean,
    readonly testID?: string
};

export const ProgressBar = ({ progress, indeterminate = false, style, fillStyle, testID }: ProgressBarProps) => {
  return (
    <PaperProgressBar
      style = {[styles.container, style]}
      progress = {progress}
      indeterminate = {indeterminate}
      fillStyle = {[styles.fillStyle, fillStyle]}
      testID = {testID} />
  );
};
