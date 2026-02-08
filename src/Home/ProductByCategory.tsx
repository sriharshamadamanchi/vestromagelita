import React from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import colors from "../common/theme/material-theme.json";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategoryAction } from "./redux/actions";
import { Product, storeType } from "../common/store/types";
import { Card, Label, LoadingIndicator } from "../common/components";
import { moderateScale } from "react-native-size-matters";
import { loaderSelector } from "../common/loaderRedux/selectors";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.schemes.light.background
  },
  cardStyle: {
    width: width * 0.45,
    marginHorizontal: width * 0.025
  },
  imageStyle: {
    height: moderateScale(200),
    width: "100%"
  },
  labelStyle: {
    marginTop: moderateScale(10)
  }
})

const RenderProduct = ({ product }: { readonly product: Product }) => {
  return (
    <Card
      style = {styles.cardStyle}
      onPress = {() => {

      }}>
      <View>
        <Image style = {styles.imageStyle} source = {{ uri: product.images.at(0) }} />
        <View style = {styles.labelStyle}>
          <Label title = {`$${product.price}`} />
          <Label title = {product.title} />
        </View>
      </View>
    </Card>
  )
}

export const ProductByCategory = ({ route: { params: { categoryId, name } } }: {readonly route: {params: {categoryId: number, name: string }}}) => {

  const dispatch = useDispatch()
  const products = useSelector((store: storeType) => store.home.productsByCategory[categoryId]) || []
  const { loading }: { loading: boolean } = useSelector(loaderSelector("FetchProductsByCategory"))
  const navigation = useNavigation()

  React.useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategoryAction({ categoryId }))
    }
  }, [dispatch])

  React.useEffect(() => {
    navigation.setOptions({
      title: name.toUpperCase()
    })
  }, [navigation])

  return (
    <View style = {styles.container}>
      <LoadingIndicator loading = {loading} />
      <FlatList
        data = {products}
        numColumns = {2}
        renderItem = {({ item }) => <RenderProduct product = {item} />}
      />
    </View>
  )
}
