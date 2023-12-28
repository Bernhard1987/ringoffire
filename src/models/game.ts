export class Game {
    public players: string[] = ['Hans', 'Peter', 'Sabine', 'Freddi'];
    public stack: string[] = [];
    public playedCard: string[] = [];
    public currentPlayer: number = 0;

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
            this.stack.push('spades_' + i);
        }
        this.stack = shuffleArray(this.stack);
    }
}

/**
 * Mixes input array and returns mixed array with Fisher-Yates Shuffle-Algorithm
 * @param array to be mixed
 * @returns mixed array
 */
function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
  
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
  
    return shuffledArray;
  }