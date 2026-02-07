import React from "react"
import { StyleSheet, View } from "react-native"
import { CurvedButton, Label, Wave } from "../../common/components"
import { moderateScale } from "react-native-size-matters"
import { useNavigation } from "@react-navigation/native"
import { LoginOrRegisterScreenNavigationProp } from "../../common/navigation/types"
import { theme } from "../../common/theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  labelStyle: {
    marginVertical: moderateScale(10)
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    marginVertical: moderateScale(20)
  },
  buttonStyle: {
    width: moderateScale(300),
    height: moderateScale(50),
    marginVertical: moderateScale(15)
  }
})

const LoginOrRegister = () => {
  const navigation = useNavigation<LoginOrRegisterScreenNavigationProp>()

  return (
    <View style = {styles.container}>

      <Wave
        count = {2}
        waveHeight = {100}
        height = {300}
        colors = {["#0C7779", "#005461"]}
        style = {{
          transform: [{ rotate: "180deg" }]
        }}
      />
      <View style = {styles.subContainer}>
        <Label xxxl title = "Welcome !" style = {styles.labelStyle} />
        <CurvedButton
          buttonStyle = {styles.buttonStyle}
          title = "Register"
          onPress = {() => {
            navigation.navigate("Register")
          }}
        />
        <CurvedButton
          inverse
          buttonStyle = {styles.buttonStyle}
          title = "Login"
          onPress = {() => {
            navigation.navigate("Login")
          }}
        />
      </View>
      <Wave
        count = {2}
        waveHeight = {100}
        height = {300}
        colors = {["#005461", "#0C7779"]}
      />
    </View>
  )
}

export default LoginOrRegister
