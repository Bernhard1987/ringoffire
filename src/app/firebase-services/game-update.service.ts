import { Injectable, inject } from '@angular/core';
import { Firestore, doc, addDoc, collectionData, updateDoc, onSnapshot, collection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root'
})

export class GameUpdateService {

  gameList: Game[] = [];
  currentGame: Game = {
    players: [],
    stack: [],
    playedCard: [],
    currentPlayer: 0,
    pickCardAnimation: false,
    currentCard: ''
  };
  gameId: string = '';

  // unsubList;
  gameUnsub!: () => void;
  gameSubscription: Subscription = new Subscription;

  firestore: Firestore = inject(Firestore);

  constructor() {
    // this.unsubList = this.collectGamesList();
  }

  ngOnDestroy() {
    // this.unsubList();
  }

  // collectGamesList() {
  //   return onSnapshot(this.getGamesRef(), (list) => {
  //     this.gameList = [];
  //     list.forEach(element => {
  //       this.gameList.push(this.setGameObject(element.data()));
  //     })
  //   })
  // }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getSingleGameRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  setGameObject(obj: any): Game {
    return {
      players: obj.players || "",
      stack: obj.stack || "",
      playedCard: obj.playedCard || "",
      currentPlayer: obj.currentPlayer || 0,
      pickCardAnimation: obj.pickCardAnimation,
      currentCard: obj.currentCard
    }
  }

  async addGame(newGame: Game) {
    await addDoc(this.getGamesRef(), newGame).catch(
      (err) => { console.error(err) }
    ).then((docRef) => { 
      if (docRef) {
        this.gameId = docRef?.id; 
      }
    }
    );
  }

  async updateGame() {
    if (this.gameId) {
      let docRef = this.getSingleGameRef('games', this.gameId);
      await updateDoc(docRef, this.getCleanJson(this.currentGame));
    }
  }

  getCleanJson(currentGame: Game): {} {
    return {
      players: currentGame.players,
      stack: currentGame.stack,
      playedCard: currentGame.playedCard,
      currentPlayer: currentGame.currentPlayer,
      pickCardAnimation: currentGame.pickCardAnimation,
      currentCard: currentGame.currentCard
    }
  }

  loadGame(): Observable<Game> {
    return new Observable((observer) => {
      this.gameUnsub = onSnapshot(this.getSingleGameRef('games', this.gameId), (doc) => {
        let dataResult = this.setGameObject(doc.data());
        this.currentGame = dataResult;
        observer.next(dataResult);
      }, (error) => {
        observer.error(error);
      });
    });
  }

  unsubscribeGame() {
    if (this.gameUnsub) {
      this.gameUnsub();
    }
  }
}