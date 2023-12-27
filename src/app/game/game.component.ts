import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game;

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
      }
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1000);
    }
  }
}
