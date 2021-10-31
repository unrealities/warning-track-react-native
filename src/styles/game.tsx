import { StyleSheet } from "react-native";

export const GameStyles = StyleSheet.create({
  atContainer: {
    marginRight: 20,
    marginTop: 6,
    width: 20,
  },
  atTxt: {
    color: "#63513c",
    fontSize: 36,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
  },
  finalTxt: {
    color: "#63513c",
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
    alignItems: "stretch",
    alignSelf: "center",
    backgroundColor: "#ECE2C2",
    borderColor: "#593811",
    borderWidth: 3,
    borderRadius: 20,
    flexDirection: "row",
    margin: 6,
    minHeight: 96,
    maxHeight: 160,
    maxWidth: 410,
    paddingBottom: 18,
    paddingTop: 48,
    justifyContent: "space-evenly",
    shadowColor: "#153600",
    shadowOffset: { height: 6, width: 6 },
    shadowOpacity: 0.5,
    width: 410,
  },
  gamesContainer: {
    height: "100%",
    flex: 1,
    flexDirection: "row",
    flexGrow: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 12,
    width: "100%",
  },
  gameStateContainer: {
    marginTop: -16
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
  mainContainer: {
    flexGrow: 1,
  },
  noGamesContainer: {
    alignContent: "center",
    alignSelf: "center",
    backgroundColor: "#ECE2C2",
    borderColor: "#593811",
    borderWidth: 3,
    borderRadius: 20,
    minHeight: 86,
    marginTop: 20,
    padding: 20,
    shadowColor: "#153600",
    shadowOffset: { height: 6, width: 6 },
    shadowOpacity: 0.5,
  },
  noGamesText: {
    color: "#63513c",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  nonLiveGameContainer: {
    alignItems: "stretch",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: -34,
  },
  preGameTime: {
    color: "#593811",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 18,
    minWidth: 80,
    textAlign: "center",
  },
  scoreContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -20,
  },
});
