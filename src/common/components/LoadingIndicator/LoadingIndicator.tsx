import * as React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 100,
    elevation: 100,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});

type LoadingIndicatorProps = {
  readonly loading: boolean,
  readonly color?: string,
  readonly size?: "small" | "large" | number
}

export const LoadingIndicator = ({ loading, color, size = moderateScale(40) }: LoadingIndicatorProps) => {
  if (loading) {
    return (
      <View style = {styles.container}>
        <ActivityIndicator size = {size} animating = {loading} color = {color} hidesWhenStopped />
      </View>
    );
  }

  return null;
};
