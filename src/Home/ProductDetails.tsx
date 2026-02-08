import React from "react";
import { Image, StyleSheet, View } from "react-native";
import colors from "../common/theme/material-theme.json";
import { useSelector } from "react-redux";
import { storeType } from "../common/store/types";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { Carousel, CurvedButton, Label } from "../common/components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.schemes.light.background
  },
  detailsStyle: {
    marginHorizontal: moderateScale(10)
  },
  imageStyle: {
    height: moderateScale(300)
  },
  labelStyle: {
    marginTop: moderateScale(10)
  },
  buttonStyle: {
    width: moderateScale(300),
    height: moderateScale(50),
    marginVertical: moderateScale(15)
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: moderateScale(30)
  }
})

export const ProductDetails = ({ route: { params: { categoryId, productId } } }: {readonly route: {params: {categoryId: number, productId: number }}}) => {

  const products = useSelector((store: storeType) => store.home.productsByCategory[categoryId]) || []
  const product = products.find((p) => p.id === productId)
  const navigation = useNavigation()

  React.useEffect(() => {
    navigation.setOptions({
      title: product?.title?.toUpperCase()
    })
  }, [navigation])

  return (
    <View style = {styles.container}>
      <Carousel
        data = {product?.images || []}
        renderItem = {({ item }) => {
          return (
            <Image style = {styles.imageStyle} source = {{ uri: item }} />
          )
        }}
      />
      <View style = {styles.detailsStyle} >
        <Label style = {styles.labelStyle} title = {`$${product?.price || ""}`} />
        <Label secondary title = {product?.description || ""} numberOfLines = {10} ellipsizeMode = "tail" />
      </View>
      <View style = {styles.buttonContainer}>
        <CurvedButton
          buttonStyle = {styles.buttonStyle}
          title = "Add To Cart"
          inverse
          onPress = {() => {
          }}
        />
        <CurvedButton
          buttonStyle = {styles.buttonStyle}
          title = "Buy Now"
          onPress = {() => {
          }}
        />
      </View>
    </View>
  )
}
