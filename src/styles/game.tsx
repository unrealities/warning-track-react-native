import { StyleSheet } from "react-native";

export const GameStyles = StyleSheet.create({
  background: {
    justifyContent: "center",
    width: "100%",
  },
  backgroundImg: {
    alignItems: "center",
    backgroundColor: "#44aa00",
    borderRadius: 0,
    resizeMode: "repeat",
  },
  container: {
    height: "100%",
  },
  finalTxt: {
    fontSize: 36,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
  },
  finalTxtContainer: {
    marginTop: -20,
    width: 50,
  },
  gameContainer: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#ECE2C2",
    borderWidth: 2,
    borderRadius: 20,
    flexDirection: "row",
    margin: 10,
    maxHeight: 140,
    maxWidth: 410,
    minHeight: 90,
    minWidth: 260,
    padding: 10,
    paddingTop: 50,
    justifyContent: "center",
    shadowColor: "#225500",
    shadowOffset: { height: 4, width: 4 },
    shadowOpacity: 0.5,
  },
  gameStateContainer: {
    marginTop: 0,
  },
  inningStateContainer: {
    backgroundColor: "#55D400",
    borderColor: "#225500",
    borderRadius: 20,
    borderWidth: 1,
    height: 110,
    marginLeft: 10,
    marginRight: 10,
    marginTop: -42,
    paddingTop: 2,
    width: 80,
  },
  inningTxtContainer: {
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
  },
  noGamesContainer: {
    marginTop: 20,
  },
  noGamesText: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  preGameTime: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    textAlign: "center",
  },
  preGameContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -40,
  },
  scoreContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -20,
  },
});
