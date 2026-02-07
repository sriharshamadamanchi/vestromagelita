import * as React from "react";

import MaterialRipple from "react-native-material-ripple";

interface rippleType {
  readonly children: any,
  readonly onPress?: () => void,
  readonly onLongPress?: () => void,
  readonly testID?: string,
  readonly accessibilityLabel?: string,
  readonly style?: any,
  readonly disabled?: boolean,
  readonly rippleOpacity?: number,
  readonly rippleContainerBorderRadius?: number
};
export const Ripple = ({ children, testID, accessibilityLabel, ...rest }: rippleType) => {
  return (
    <MaterialRipple
      rippleOpacity = {0.09}
      rippleDuration = {300}
      rippleContainerBorderRadius = {50}
      testID = {testID}
      accessibilityLabel = {accessibilityLabel}
      {...rest}
    >
      {children}
    </MaterialRipple>
  );
};
