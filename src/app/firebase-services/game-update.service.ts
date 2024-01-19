import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, onSnapshot, collection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GameUpdateService {

  firestore: Firestore = inject(Firestore);

  constructor() { }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }
}
