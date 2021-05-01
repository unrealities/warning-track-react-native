import React from 'react';
import { ScrollView } from 'react-native';

import Background from '../components/background';
import { GamesContainer, GamesProps } from '../components/game';
import { GameStyles } from '../styles/game';

export class GamesScreen extends React.Component<GamesProps> {
  constructor(props: GamesProps) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={GameStyles.container}>
        <Background style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 16,
          bottom: 0,
        }} />
        <GamesContainer games={this.props.games} />
      </ScrollView>
    );
  }
}