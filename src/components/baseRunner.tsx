import React from "react";
import { View } from "react-native";
import Svg, { G, Rect } from "react-native-svg";

import { BaseRunnerStyles } from "../styles/baseRunner";

export interface BaseRunnerProps {
  value: number;
}

export const BaseRunner: React.FC<BaseRunnerProps> = (props) => {
  let stroke = [];
  let fill = [];

  switch (props.value) {
    case 0:
      stroke = ["#225500", "#225500", "#225500"];
      fill = ["#ffffff", "#ffffff", "#ffffff"];
      break;
    case 1:
      stroke = ["#baa400", "#225500", "#225500"];
      fill = ["#f5d800", "#ffffff", "#ffffff"];
      break;
    case 2:
      stroke = ["#225500", "#baa400", "#225500"];
      fill = ["#ffffff", "#f5d800", "#ffffff"];
      break;
    case 3:
      stroke = ["#225500", "#225500", "#baa400"];
      fill = ["#ffffff", "#ffffff", "#f5d800"];
      break;
    case 4:
      stroke = ["#baa400", "#baa400", "#225500"];
      fill = ["#f5d800", "#f5d800", "#ffffff"];
      break;
    case 5:
      stroke = ["#baa400", "#225500", "#baa400"];
      fill = ["#f5d800", "#ffffff", "#f5d800"];
      break;
    case 6:
      stroke = ["#225500", "#baa400", "#baa400"];
      fill = ["#ffffff", "#f5d800", "#f5d800"];
      break;
    case 7:
      stroke = ["#baa400", "#baa400", "#baa400"];
      fill = ["#f5d800", "#f5d800", "#f5d800"];
      break;
    default:
      stroke = ["#225500", "#225500", "#225500"];
      fill = ["#ffffff", "#ffffff", "#ffffff"];
      break;
  }
  return (
    <View style={BaseRunnerStyles.baseRunner}>
      <Svg viewBox="0 0 34 26" width="68" height="52">
        <G>
          <Rect
            transform="rotate(45 25.07106781005859,17.071067810058594) "
            ry="1"
            rx="1"
            height="10"
            width="10"
            y="12.07107"
            x="20.07107"
            stroke={stroke[0]}
            fill={fill[0]}
          />
          <Rect
            transform="rotate(45 17.071067810058594,9.071067810058592) "
            ry="1"
            rx="1"
            height="10"
            width="10"
            y="4.07107"
            x="12.07107"
            stroke={stroke[1]}
            fill={fill[1]}
          />
          <Rect
            transform="rotate(45 9.071067810058596,17.071067810058594) "
            ry="1"
            rx="1"
            height="10"
            width="10"
            y="12.07107"
            x="4.07107"
            stroke={stroke[2]}
            fill={fill[2]}
          />
        </G>
      </Svg>
    </View>
  );
};
