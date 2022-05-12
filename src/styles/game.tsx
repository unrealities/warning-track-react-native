import { StyleSheet } from "react-native";

export const GameStyles = StyleSheet.create({
  atContainer: {
    marginTop: 6,
    width: 40,
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
    backgroundColor: "#faf5e3",
    borderColor: "#593811",
    borderWidth: 3,
    borderRadius: 20,
    flexDirection: "row",
    marginTop: 12,
    minHeight: 96,
    minWidth: 400,
    maxHeight: 122,
    paddingBottom: 18,
    paddingTop: 8,
    justifyContent: "space-evenly",
    shadowColor: "#153600",
    shadowOffset: { height: 6, width: 6 },
    shadowOpacity: 0.5,
    width: 420,
  },
  gamesContainer: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    paddingTop: 16,
    width: "100%",
  },
  gameStateContainer: {
    alignContent: "center",
    alignSelf: "center",
    backgroundColor: "#faf5e3",
    borderColor: "#593811",
    borderWidth: 3,
    borderRadius: 20,
    flex: 1,
    flexDirection: "row",
    minHeight: 120,
    maxHeight: 120,
    minWidth: 400,
    maxWidth: 420,
    marginTop: 12,
    paddingTop: 6,
    shadowColor: "#153600",
    shadowOffset: { height: 6, width: 6 },
    shadowOpacity: 0.5,
  },
  inningStateContainer: {
    backgroundColor: "#55D400",
    borderColor: "#225500",
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    flexDirection: "column",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 2,
    maxWidth: 80,
  },
  inningTxtContainer: {
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
  },
  liveGameContainer: {
    flex: 1,
    flexDirection: "column",
    height: 100,
    justifyContent: 'space-between',
    marginTop: 4,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  noGamesContainer: {
    alignContent: "center",
    alignSelf: "center",
    backgroundColor: "#faf5e3",
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
    marginTop: 6,
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
