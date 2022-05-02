import { StyleSheet } from "react-native";

export const ScoreStyles = StyleSheet.create({
  score: {
    fontSize: 64,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginTop: -4,
    textAlign: "center",
  },
  scoreContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    height: 60,
    justifyContent: "center",
    width: 300,
  },
});
