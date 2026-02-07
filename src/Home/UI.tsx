import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { AnchorButton, AvatarIcon, AvatarLabel, Banner, Card, CheckBox, CurvedButton, Label, LoadingIndicator, ProgressBar, RadioButton, SegmentedButton, Switch } from "../common/components";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  component: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: moderateScale(50),
    paddingHorizontal: moderateScale(20)
  },
  loader: {
    height: moderateScale(50),
    right: moderateScale(20)
  }
})

const _Banner = () => {
  return (
    <Banner
      visible
      actions = {[
        {
          label: "Cancel"
        }
      ]}
      renderBanner = {() => {
        return (
          <Label title = "This is a custom banner from react native paper" />
        )
      }}
    />
  )
}

const _Loader = () => {
  return (
    <View style = {styles.component}>
      <Label semibold title = "Loader" />
      <View style = {styles.loader}>
        <LoadingIndicator loading />
      </View>
    </View>
  )
}

const _AvatarIcon = () => {
  return (
    <View style = {[styles.component]}>
      <Label semibold title = "Avatar Icon" />
      <AvatarIcon icon = "chat" size = {moderateScale(40)} />
    </View>
  )
}

const _AvatarText = () => {
  return (
    <View style = {[styles.component]}>
      <Label semibold title = "Avatar Text" />
      <AvatarLabel label = "MS" size = {moderateScale(40)} />
    </View>
  )
}

const _AnchorButton = () => {
  return (
    <View style = {[styles.component]}>
      <Label semibold title = "Anchor Button" />
      <AnchorButton title = "Anchor Button" />
    </View>
  )
}

const _Card = () => {
  return (
    <View style = {[styles.component]}>
      <Label semibold title = "Card" />
      <Card>
        <Label title = "This is a card" />
      </Card>
    </View>
  )
}

const _CurvedButton = () => {
  return (
    <View style = {[styles.component]}>
      <Label semibold title = "Curved Button" />
      <CurvedButton title = "Curved Button" buttonStyle = {{ width: moderateScale(160), height: moderateScale(45) }} />
    </View>
  )
}

const _CheckBox = () => {
  const [checked, setChecked] = React.useState(false)

  return (
    <View style = {[styles.component]}>
      <Label semibold title = "Check Button" />
      <CheckBox checked = {checked} onPress = {setChecked} />
    </View>
  )
}

const _RadioButton = () => {
  const [checked, setChecked] = React.useState("")

  return (
    <View style = {[styles.component]}>
      <Label semibold title = "Radio Button" />
      <RadioButton value = "checked" checked = {checked} onPress = {() => {
        if (!checked) {
          setChecked("checked")
        } else {
          setChecked("")
        }
      }} />
    </View>
  )
}

const _Switch = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);

  return (
    <View style = {[styles.component]}>
      <Label semibold title = "Switch" />
      <Switch checked = {isSwitchOn} onChange = {setIsSwitchOn} />
    </View>
  )
}

const _ProgressBar = () => {

  return (
    <View style = {[styles.component]}>
      <Label semibold title = "Progress Bar" />
      <ProgressBar progress = {0.5} />
    </View>
  )
}

const _SegmentedButton = () => {

  const [selectedButton, setSelectedButton] = React.useState("2")

  return (
    <View style = {[styles.component, { justifyContent: "flex-start" }]}>
      <Label semibold title = "Segmented..." />
      <SegmentedButton
        selectedButton = {selectedButton}
        buttons = {[
          {
            value: "1",
            label: "One",
            showSelectedCheck: true
          },
          {
            value: "2",
            label: "Two",
            showSelectedCheck: true
          },
          {
            value: "3",
            label: "Three",
            showSelectedCheck: true
          }
        ]}
        onChange = {(val: string) => setSelectedButton(val)}
        style = {{ marginLeft: moderateScale(40) }}
      />
    </View>
  )
}

export const UI = () => {

  return (
    <ScrollView style = {styles.container}>
      <UI.Loader />
      <UI.AvatarIcon />
      <UI.AvatarText />
      <UI.Banner />
      <UI.AnchorButton />
      <UI.Card />
      <UI.CurvedButton />
      <UI.CheckBox />
      <UI.RadioButton />
      <UI.Switch />
      <UI.ProgressBar />
      <UI.SegmentedButton />
    </ScrollView>
  )

}

UI.Loader = _Loader
UI.AvatarIcon = _AvatarIcon
UI.AvatarText = _AvatarText
UI.Banner = _Banner
UI.AnchorButton = _AnchorButton
UI.Card = _Card
UI.CurvedButton = _CurvedButton
UI.CheckBox = _CheckBox
UI.RadioButton = _RadioButton
UI.Switch = _Switch
UI.ProgressBar = _ProgressBar
UI.SegmentedButton = _SegmentedButton
