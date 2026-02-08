import * as React from "react";
import { Dimensions, StyleSheet, View, ViewStyle } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import RNCarousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { theme } from "../../theme";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  dotStyle: {
    width: moderateScale(25),
    height: moderateScale(4),
    backgroundColor: theme.colors.outline
  },
  activeDotStyle: {
    overflow: "hidden",
    backgroundColor: theme.colors.primary
  },
  containerStyle: {
    gap: moderateScale(10),
    marginVertical: moderateScale(5)
  },
  carouselStyle: {
    height: moderateScale(300)
  }
})

type CarouselProps<T> = {
  readonly data: T[];
  readonly renderItem: (info: { item: T; index: number }) => React.ReactElement;
  readonly pagination?: boolean
  readonly carouselStyle?: ViewStyle
  readonly width?: number
};

const { width: windowWidth } = Dimensions.get("window")

export const Carousel = <T, >({ data, renderItem, pagination = true, carouselStyle = {}, width }: CarouselProps<T>) => {

  const progress = useSharedValue<number>(0);

  const ref = React.useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({

      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true
    });
  };

  return (
    <View>
      <RNCarousel
        ref = {ref}
        data = {data}
        loop
        width = {width || windowWidth}
        pagingEnabled
        snapEnabled
        style = {{ ...styles.carouselStyle, ...carouselStyle }}
        mode = "parallax"
        modeConfig = {{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50
        }}
        renderItem = {renderItem}
        onProgressChange = {(_, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
      />
      {
        pagination &&
              <Pagination.Basic
                progress = {progress}
                data = {data}
                dotStyle = {styles.dotStyle}
                activeDotStyle = {styles.activeDotStyle}
                containerStyle = {styles.containerStyle}
                horizontal
                onPressPagination = {onPressPagination}
              />
      }
    </View>
  );
}
