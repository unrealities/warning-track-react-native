import React from "react";
import { View } from "react-native";
import Svg from "react-native-svg";

import { LIStyles } from "../styles/leverageIndex";

export interface LIProps {
  value: number;
}

export const LeverageIndex: React.FC<LIProps> = (props) => {
  let stroke = [];
  let fill = [];

  switch (props.value) {
    case 0:
      stroke = ["#e6db8a", "#e6db8a", "#e6db8a", "#e6db8a", "#e6db8a"];
      fill = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"];
      break;
    case 1:
      stroke = ["#e6db8a", "#e6db8a", "#e6db8a", "#e6db8a", "#baa400"];
      fill = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#f5d800"];
      break;
    case 2:
      stroke = ["#e6db8a", "#e6db8a", "#e6db8a", "#baa400", "#baa400"];
      fill = ["#ffffff", "#ffffff", "#ffffff", "#f5d800", "#f5d800"];
      break;
    case 3:
      stroke = ["#e6db8a", "#e6db8a", "#baa400", "#baa400", "#baa400"];
      fill = ["#ffffff", "#ffffff", "#f5d800", "#f5d800", "#f5d800"];
      break;
    case 4:
      stroke = ["#e6db8a", "#baa400", "#baa400", "#baa400", "#baa400"];
      fill = ["#ffffff", "#f5d800", "#f5d800", "#f5d800", "#f5d800"];
      break;
    default:
      stroke = ["#e6db8a", "#e6db8a", "#e6db8a", "#e6db8a", "#e6db8a"];
      fill = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"];
      break;
  }

  return (
    <View style={LIStyles.leverageIndex}>
      <Svg>
        <g>
          <path
            d="m2.08791,8.81967l7.57237,0l2.33991,-7.19372l2.33993,7.19372l7.57236,0l-6.12615,4.44591l2.34004,7.19373l-6.12617,-4.44603l-6.12616,4.44603l2.34004,-7.19373l-6.12616,-4.44591l0,0z"
            stroke={stroke[0]}
            fill={fill[0]}
          />
          <path
            d="m2.08791,28.15304l7.57237,0l2.33991,-7.19372l2.33993,7.19372l7.57236,0l-6.12616,4.4459l2.34004,7.19373l-6.12617,-4.44604l-6.12616,4.44604l2.34004,-7.19373l-6.12616,-4.4459l0,0z"
            stroke={stroke[1]}
            fill={fill[1]}
          />
          <path
            d="m2.08791,48.48639l7.57237,0l2.33991,-7.19372l2.33993,7.19372l7.57236,0l-6.12616,4.4459l2.34004,7.19373l-6.12617,-4.44604l-6.12616,4.44604l2.34004,-7.19373l-6.12616,-4.4459l0,0z"
            stroke={stroke[2]}
            fill={fill[2]}
          />
          <path
            d="m2.08791,68.81975l7.57237,0l2.33991,-7.19373l2.33993,7.19373l7.57236,0l-6.12616,4.4459l2.34004,7.19373l-6.12617,-4.44604l-6.12616,4.44604l2.34004,-7.19373l-6.12616,-4.4459l0,0z"
            stroke={stroke[3]}
            fill={fill[3]}
          />
          <path
            d="m2.08791,89.15311l7.57237,0l2.33991,-7.19372l2.33993,7.19372l7.57236,0l-6.12616,4.4459l2.34004,7.19373l-6.12617,-4.44604l-6.12616,4.44604l2.34004,-7.19373l-6.12616,-4.4459l0,0z"
            stroke={stroke[4]}
            fill={fill[4]}
          />
        </g>
      </Svg>
    </View>
  );
};
