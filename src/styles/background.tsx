import { Dimensions, StyleSheet } from "react-native";

const win = Dimensions.get('window');

//TODO: Background cuts off if games need to be scrolled
export const BackgroundStyles = StyleSheet.create({
  container: {
    bottom: 0,
    flex: 1,
    height: win.height,
    left: 0,
    position: "absolute",
    resizeMode: "stretch",
    right: 0,
    top: 0,
    width: win.width,
  },
});
