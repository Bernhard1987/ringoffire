import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game;
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      let internalCurrentCard = this.game.stack.pop(); //pop takes last value out of array, original value will be deleted
      if (internalCurrentCard != undefined) {
        this.currentCard = internalCurrentCard;
        console.log('New Card: ', this.currentCard);
        console.log('Game is ', this.game);
      }
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCard.push(this.currentCard);
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
