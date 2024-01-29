import { Injectable, inject } from '@angular/core';
import { Firestore, doc, addDoc, collectionData, onSnapshot, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GameData } from '../interfaces/game-data.interface';

@Injectable({
  providedIn: 'root'
})

export class GameUpdateService {

  gameList: GameData[] = [];
  currentGame: GameData = {
    players: [],
    stack: [],
    playedCard: [],
    currentPlayer: 0
  };
  gameId: string = '';

  unsubList;
  // unsubGame;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubList = this.collectGamesList();
    // this.unsubGame = this.loadGame();
  }

  ngOnDestroy() {
    this.unsubList();
    // this.unsubGame();
  }

  collectGamesList() {
    return onSnapshot(this.getGamesRef(), (list) => {
      this.gameList = [];
      list.forEach(element => {
        this.gameList.push(this.setGameObject(element.data()));
      })
    })
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getSingleGameRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  setGameObject(obj: any): GameData {
    return {
      players: obj.players || "",
      stack: obj.stack || "",
      playedCard: obj.playedCard || "",
      currentPlayer: obj.currentPlayer || 0
    }
  }

  async addGame(newGame: GameData) {
    await addDoc(this.getGamesRef(), newGame).catch(
      (err) => { console.error(err) }
    ).then((docRef) => { 
      console.log("new game added with id: ", docRef?.id);
      if (docRef) {
        this.gameId = docRef?.id; 
      }
    }
    );
  }

  async updateGame() {
    if (this.gameId) {
      let docRef = this.getSingleGameRef('games', this.gameId);
      console.log(docRef);
    }
  }

  loadGame(): Observable<GameData> {
    return new Observable((observer) => {
      onSnapshot(this.getSingleGameRef('games', this.gameId), (doc) => {
        let dataResult = this.setGameObject(doc.data());
        this.currentGame = dataResult;
        observer.next(dataResult);
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }
}