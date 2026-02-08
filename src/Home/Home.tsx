import React from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import colors from "../common/theme/material-theme.json";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "./redux/actions";
import { Category, storeType } from "../common/store/types";
import { Card, Label, LoadingIndicator } from "../common/components";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { loaderSelector } from "../common/loaderRedux/selectors";

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
    height: moderateScale(120),
    width: "100%"
  },
  labelStyle: {
    marginTop: moderateScale(10)
  }
})

const RenderCategory = ({ category, onPress }: { readonly category: Category, readonly onPress: () => void }) => {
  return (
    <Card
      style = {styles.cardStyle}
      onPress = {onPress}>
      <View>
        <Image style = {styles.imageStyle} source = {{ uri: category.image }} />
        <Label style = {styles.labelStyle} title = {category.name.toUpperCase()} />
      </View>
    </Card>
  )
}

export const HomeTab = () => {

  const dispatch = useDispatch()
  const categories = useSelector((store: storeType) => store.home.categories)
  const navigation = useNavigation()
  const { loading }: {loading: boolean} = useSelector(loaderSelector("FetchCategories"))

  React.useEffect(() => {
    dispatch(fetchCategoriesAction())
  }, [dispatch])

  return (
    <View style = {styles.container}>
      <LoadingIndicator loading = {loading} />
      <FlatList
        data = {categories}
        numColumns = {2}
        renderItem = {({ item }) => <RenderCategory category = {item} onPress = {() => {
          navigation.navigate("ProductByCategory", { categoryId: item.id, name: item.name })
        }} />}
      />
    </View>
  )
}
