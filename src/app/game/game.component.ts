import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { GameUpdateService } from '../firebase-services/game-update.service';
import { PlayerComponent } from '../player/player.component';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { CardRulesComponent } from '../card-rules/card-rules.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { DialogImprintComponent } from '../dialog-imprint/dialog-imprint.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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
  game: Game = new Game;
  drawableCardStackAmount: number = 9;
  gameId: string = '';

  constructor(private route: ActivatedRoute, private gameUpdateService: GameUpdateService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.gameUpdateService.gameId = params['id'];
    });
    this.gameId = this.gameUpdateService.gameId;
    this.loadGame();
  }

  ngOnDestroy() {
    this.gameUpdateService.unsubscribeGame();
  }

  loadGame() {
    this.gameUpdateService.loadGame().subscribe({
      next: (gameData) => {
        this.game = gameData;
      },
      error: (error) => {
        console.error("Error in loading game", error);
      }
    });
  }

  updateGame() {
    this.gameUpdateService.currentGame = this.game;
    this.gameUpdateService.updateGame();
  }

  takeCard() {
    if (!this.game.pickCardAnimation && this.game.players.length > 1) {
      let internalCurrentCard = this.game.stack.pop(); //pop takes last value out of array, original value will be deleted
      if (internalCurrentCard != undefined) {
        this.game.currentCard = internalCurrentCard;
      }
      this.game.pickCardAnimation = true;
      this.updateGame();
      setTimeout(() => {
        this.game.pickCardAnimation = false;
        this.game.playedCard.push(this.game.currentCard);
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.updateGame();
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
        this.updateGame();
      }
    });
  }
}
