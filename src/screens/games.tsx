import React from 'react';
import { ImageBackground, View } from 'react-native';

import { GamesContainer, GamesProps } from '../components/game';
import { GameStyles } from '../styles/game';
  
export class GamesScreen extends React.Component<GamesProps> {
    constructor(props: GamesProps) {
      super(props);
    }
  
    render() {
      let backgroundImg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCI+CjxyZWN0IHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCIgZmlsbD0iIzQ0YWEwMCI+PC9yZWN0Pgo8ZyB0cmFuc2Zvcm09InJvdGF0ZSg0NSkiPgo8cmVjdCB3aWR0aD0iOTkiIGhlaWdodD0iMjUiIGZpbGw9IiM1NWQ0MDAiPjwvcmVjdD4KPHJlY3QgeT0iLTUwIiB3aWR0aD0iOTkiIGhlaWdodD0iMjUiIGZpbGw9IiM1NWQ0MDAiPjwvcmVjdD4KPC9nPgo8L3N2Zz4=';
  
      return (
        <View style={GameStyles.container}>
          <ImageBackground imageStyle={GameStyles.backgroundImg}
            source={{ uri: backgroundImg }}
            style={GameStyles.background}>
            <GamesContainer games={this.props.games} />
          </ImageBackground>
        </View>
      );
    }
  }