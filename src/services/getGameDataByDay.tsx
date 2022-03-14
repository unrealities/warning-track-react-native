// TODO: Switch to direct firestore call
import { doc, DocumentReference, DocumentSnapshot, getDoc } from "firebase/firestore"; 
import firestore from "../firebase";

export interface GameDataResponseGame {
  gameTime: string;
  leverageIndex: number;
  mlbID: number;
  mlbTVLink: string;
  status: {
    baseState: {
      First: boolean;
      Second: boolean;
      Third: boolean;
    };
    count: {
      balls: number;
      strikes: number;
    };
    inning: number;
    inProgress: boolean;
    outs: number;
    score: {
      away: number;
      home: number;
    };
    topOfInning: boolean;
  };
  teams: {
    away: number;
    home: number;
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
  const docData: DocumentSnapshot = await getDoc(docRef);
  // TODO: if (!docData.exists()) return nil
  
  console.log("GetScores()");
  console.log(docData.get("Games"));
  return docData.get("Games") as GameDataResponseGame;
}
