import React from "react";
import { StyleSheet, View } from "react-native";
import { UI } from "./UI";
import colors from "../common/theme/material-theme.json";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.schemes.light.background
  }
})

export const HomeTab = () => {

  return (
    <View style = {styles.container}>
      <UI />
    </View>
  )
}
