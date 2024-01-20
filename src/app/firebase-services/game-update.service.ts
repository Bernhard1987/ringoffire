import { Injectable, inject } from '@angular/core';
import { Firestore, doc, collectionData, onSnapshot, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GameData } from '../interfaces/game-data.interface';

@Injectable({
  providedIn: 'root'
})

export class GameUpdateService {

  gameList: GameData[] = [];

  unsubList;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubList = this.collectGamesList();
  }

  collectGamesList() {
    return onSnapshot(this.getGamesRef(), (list) => {
      this.gameList = [];
      list.forEach(element => {
        this.gameList.push(this.setGameObject(element.data(), element.id));
      })
    })
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getSingleGameRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  setGameObject(obj: any, id: string): GameData {
    return {
      players: obj.players || "",
      stack: obj.stack || "",
      playedCard: obj.playedCard || "",
      currentPlayer: obj.currentPlayer || 0
    }
  }
}
