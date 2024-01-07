import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { CardRulesComponent } from '../card-rules/card-rules.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { DialogImprintComponent } from '../dialog-imprint/dialog-imprint.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,
            PlayerComponent,
            CardRulesComponent,
            MatButtonModule,
            MatIconModule,
            MatDialogModule,
            DialogAddPlayerComponent,
            DialogImprintComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
  addPlayerComponent = DialogAddPlayerComponent;
  imprintComponent = DialogImprintComponent;
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game;
  drawableCardStackAmount: number = 9;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    console.log("new game started:", this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation && this.game.players.length > 1) {
      let internalCurrentCard = this.game.stack.pop(); //pop takes last value out of array, original value will be deleted
      if (internalCurrentCard != undefined) {
        this.currentCard = internalCurrentCard;
      }
      this.pickCardAnimation = true;
      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCard.push(this.currentCard);
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      }, 1000);
    }
  }

  drawCardStackAmount(): string[] {
    let drawableStack;
    if (this.game.stack.length > this.drawableCardStackAmount) {
      drawableStack = this.game.stack.slice(this.game.stack.length - this.drawableCardStackAmount);
      return drawableStack;
    } else {
      drawableStack = this.game.stack.slice(1);
      return drawableStack;
    }
  }

  openDialog(component: ComponentType<any>): void {
    const dialogRef = this.dialog.open(component);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
