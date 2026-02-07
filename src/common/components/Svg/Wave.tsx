import React from "react";
import { useWindowDimensions } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

const generateWavePath = ({
  width = 1440,
  height = 160,
  waveHeight = 40,
  count = 4
}) => {
  const centerY = height / 2;
  const segmentWidth = width / count;

  let d = `M 0 ${centerY}`;

  for (let i = 0; i < count; i++) {
    const x1 = segmentWidth * (i + 0.25);
    const y1 = centerY + waveHeight;
    const x2 = segmentWidth * (i + 0.75);
    const y2 = centerY - waveHeight;
    const x = segmentWidth * (i + 1);

    d += ` C ${x1} ${y1}, ${x2} ${y2}, ${x} ${centerY}`;
  }

  // Close shape to bottom
  d += ` L ${width} ${height} L 0 ${height} Z`;

  return d;
};

export const Wave = ({
  height = 160,
  waveHeight = 40,
  count = 4,
  colors = ["#005461", "#0C7779"],
  style = {}
}) => {
  const { width } = useWindowDimensions();

  return (
    <Svg
      width = {width}
      height = {height}
      viewBox = {`0 0 1440 ${height}`}
      preserveAspectRatio = "none"
      style = {style}
    >
      <Defs>
        <LinearGradient id = "waveGradient" x1 = "0%" y1 = "0%" x2 = "100%" y2 = "0%">
          <Stop offset = "0%" stopColor = {colors[0]} />
          <Stop offset = "100%" stopColor = {colors[1]} />
        </LinearGradient>
      </Defs>

      <Path
        d = {generateWavePath({
          width: 1440,
          height,
          waveHeight,
          count
        })}
        fill = "url(#waveGradient)"
      />
    </Svg>
  );
};
