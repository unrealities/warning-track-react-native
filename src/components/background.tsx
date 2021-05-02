import * as React from "react"
import { View } from 'react-native';

import { BackgroundStyles } from '../styles/background';

function Background() {
  return (
    <View style={BackgroundStyles.container}>
      <svg width={70} height={70}>
        <path fill="#4a0" d="M0 0h70v70H0z" />
        <g fill="#55d400">
          <path d="M0 0l70.004 70.004L52.326 87.68l-70.004-70.003zM35.355-35.355l70.004 70.003L87.68 52.326 17.678-17.678z" />
        </g>
      </svg>
    </View>
  )
}

export default Background
