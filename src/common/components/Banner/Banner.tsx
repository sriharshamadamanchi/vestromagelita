import * as React from "react";
import { Button, Banner as PaperBaner, useTheme } from "react-native-paper";
import { $RemoveChildren } from "react-native-paper/lib/typescript/types";

type BannerProps = {
    readonly visible: boolean,
    readonly renderBanner: () => React.ReactNode,
    readonly actions?: Array<{ label: string; } & $RemoveChildren<typeof Button>>,
    readonly icon?: any,
    readonly contentStyle?: any,
    readonly style?: any
}

export const Banner = ({ visible, actions, contentStyle = {}, renderBanner, ...rest }: BannerProps) => {

  const mTheme = useTheme()

  return (
    <PaperBaner
      contentStyle = {[contentStyle, { backgroundColor: mTheme.colors.onPrimary }]}
      visible = {visible}
      actions = {actions}
      {...rest}>
      {renderBanner()}
    </PaperBaner>
  );
}
