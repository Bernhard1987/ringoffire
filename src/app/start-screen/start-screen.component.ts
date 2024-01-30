import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameUpdateService } from '../firebase-services/game-update.service';
import { GameComponent } from '../game/game.component';
import { Game } from '../../models/game';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  gameId: string = '';
  game: Game = new Game();

  constructor(private router: Router, private gameUpdateService: GameUpdateService) {
    
  }

  async newGame() {
    await this.addGame();
    this.router.navigateByUrl(`/game/${this.gameId}`);
  }

  async addGame() {
    let newGame: Game = {
      players: this.game.players,
      stack: this.game.stack,
      playedCard: this.game.playedCard,
      currentPlayer: this.game.currentPlayer,
    }
    await this.gameUpdateService.addGame(newGame);
    this.gameId = this.gameUpdateService.gameId;
    console.log('gameId in Game Component addGame is ', this.gameId);
  }
}
