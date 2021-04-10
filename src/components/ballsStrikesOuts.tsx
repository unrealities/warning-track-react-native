import React from 'react';
import { View } from 'react-native';
import Svg, { Ellipse, G } from 'react-native-svg';

import { BSOStyles } from '../styles/ballsStrikesOuts';

export interface BSOProps {
    value: number;
}

export const BallsStrikesOuts: React.FC<BSOProps> = (props) => {
    let stroke = [];
    let fill = [];

    switch (props.value) {
        case 0:
            stroke = ["#e6db8a", "#e6db8a", "#e6db8a", "#e6db8a"];
            fill = ["#ffffff", "#ffffff", "#ffffff", "#ffffff"];
            break;
        case 1:
            stroke = ["#baa400", "#e6db8a", "#e6db8a", "#e6db8a"];
            fill = ["#f5d800", "#ffffff", "#ffffff", "#ffffff"];
            break;
        case 2:
            stroke = ["#baa400", "#baa400", "#e6db8a", "#e6db8a"];
            fill = ["#f5d800", "#f5d800", "#ffffff", "#ffffff"];
            break;
        case 3:
            stroke = ["#baa400", "#baa400", "#baa400", "#e6db8a"];
            fill = ["#f5d800", "#f5d800", "#f5d800", "#ffffff"];
            break;
        case 4:
            stroke = ["#baa400", "#baa400", "#baa400", "#baa400"];
            fill = ["#f5d800", "#f5d800", "#f5d800", "#f5d800"];
            break;
        default:
            stroke = ["#e6db8a", "#e6db8a", "#e6db8a", "#e6db8a"];
            fill = ["#ffffff", "#ffffff", "#ffffff", "#ffffff"];
            break;
    }
    return (
        <View style={BSOStyles.bso}>
            <Svg viewBox="0 0 68 25" width="50" height="18.38">
                <G>
                    <Ellipse ry="10" rx="10" cy="12" cx="12" stroke={stroke[0]} fill={fill[0]} />
                    <Ellipse ry="10" rx="10" cy="12" cx="34" stroke={stroke[1]} fill={fill[1]} />
                    <Ellipse ry="10" rx="10" cy="12" cx="56" stroke={stroke[2]} fill={fill[2]} />
                    <Ellipse ry="10" rx="10" cy="12" cx="78" stroke={stroke[3]} fill={fill[3]} />
                </G>
            </Svg>
        </View>
    )
}
