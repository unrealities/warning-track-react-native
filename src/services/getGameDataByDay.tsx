import { doc, DocumentReference, DocumentSnapshot, getDoc } from "firebase/firestore"; 
import { firestore } from "../firebase";

export interface GameDataResponseGame {
  GameTime: {
    nanoseconds: number;
    seconds: number;
  };
  LeverageIndex: number;
  MLBId: number;
  MLBTVLink: string;
  Status: {
    BaseState: {
      First: boolean;
      Second: boolean;
      Third: boolean;
    };
    Count: {
      Balls: number;
      Strikes: number;
    };
    Inning: number;
    InProgress: boolean;
    Outs: number;
    Score: {
      Away: number;
      Home: number;
    };
    TopOfInning: boolean;
  };
  Teams: {
    AwayID: number;
    HomeID: number;
  };
}

// ex. 04-23-2021
function getGameDataByDayDate() {
  let d = new Date();
  let rDate = [
    ("0" + (d.getMonth() + 1)).slice(-2),
    ("0" + d.getDate()).slice(-2),
    d.getFullYear(),
  ].join("-");
  return rDate;
}

export async function GetGameDataByDay(): Promise<GameDataResponseGame> {
  const date = getGameDataByDayDate();
  const collectionPath = "game-data-by-day";
  const docRef: DocumentReference = doc(firestore, collectionPath, date);
  const docSnap: DocumentSnapshot = await getDoc(docRef);
  if (!docSnap.exists()) {
    return {} as GameDataResponseGame;
  }
  return docSnap.get("Games") as GameDataResponseGame;
}
