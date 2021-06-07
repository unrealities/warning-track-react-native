import { Dimensions, StyleSheet } from "react-native";

const win = Dimensions.get('window');

export const BackgroundStyles = StyleSheet.create({
  container: {
    bottom: 0,
    flex: 1,
    height: win.height,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    width: win.width,
  },
});
