import React from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import colors from "../common/theme/material-theme.json";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "./redux/actions";
import { Product, storeType } from "../common/store/types";
import { Card, Label, LoadingIndicator } from "../common/components";
import { moderateScale } from "react-native-size-matters";
import { loaderSelector } from "../common/loaderRedux/selectors";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    height: moderateScale(150),
    width: "100%"
  },
  labelStyle: {
    marginTop: moderateScale(10)
  }
})

const RenderProduct = ({ product, onPress }: { readonly product: Product, readonly onPress: () => void }) => {
  return (
    <Card
      style = {styles.cardStyle}
      onPress = {onPress}>
      <View>
        <Image style = {styles.imageStyle} source = {{ uri: product.images.at(0) }} />
        <View style = {styles.labelStyle}>
          <Label title = {`$${product.price}`} />
          <Label secondary title = {product.title} numberOfLines = {2} ellipsizeMode = "tail" />
        </View>
      </View>
    </Card>
  )
}

export const Products = () => {

  const dispatch = useDispatch()
  const products = useSelector((store: storeType) => store.home.products)
  const { loading }: { loading: boolean } = useSelector(loaderSelector("FetchProducts"))
  const navigation = useNavigation()

  React.useEffect(() => {
    dispatch(fetchProductsAction())
  }, [dispatch])

  return (
    <SafeAreaView style = {styles.container}>
      <View style = {styles.container}>
        <LoadingIndicator loading = {loading} />
        <FlatList
          data = {products}
          numColumns = {2}
          renderItem = {({ item }) => <RenderProduct product = {item} onPress = {() => navigation.navigate("ProductDetails", { product: item })} />}
        />
      </View>
    </SafeAreaView>
  )
}
