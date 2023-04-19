import * as React from "react"
import { Dimensions } from "react-native"
import Svg, { Defs, Path, Pattern, Rect } from "react-native-svg"

import { BackgroundStyles } from "../styles/background"

function Background() {
  const { width, height } = Dimensions.get("window")
  return (
    <Svg 
      height={height}
      style={BackgroundStyles.fixed}
      width={width}
    >
      <Defs>
        <Pattern
          id="GreenDiagonalStripes"
          patternUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={70}
          height={70}
          viewBox="0 0 70 70"
        >
          <Path fill="#4a0" d="M0 0h70v70H0z" />
          <Path
            fill="#55d400"
            d="M0 0l70.004 70.004L52.326 87.68l-70.004-70.003zM35.355-35.355l70.004 70.003L87.68 52.326 17.678-17.678z"
          />
        </Pattern>
      </Defs>
      <Rect
        fill="url(#GreenDiagonalStripes)"
        x="0"
        y="0"
        width="100%"
        height="100%"
      />
    </Svg>
  )
}

export default Background
