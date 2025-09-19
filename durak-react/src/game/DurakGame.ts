import type { GameState, Player, Card } from '../types/game';
import { createDeck, dealCards, canBeatCard, canAddToAttack, getLowestTrump } from '../utils/cardUtils';

export class DurakGame {
  private state: GameState;
  private readonly INITIAL_HAND_SIZE = 6;

  constructor(playerName: string) {
    this.state = this.createInitialState(playerName);
  }

  private createInitialState(playerName: string): GameState {
    const deck = createDeck();
    const players: Player[] = [
      {
        id: 'player',
        name: playerName,
        hand: [],
        wins: 0,
        isComputer: false,
      },
      {
        id: 'computer',
        name: 'Computer',
        hand: [],
        wins: 0,
        isComputer: true,
      },
    ];

    return {
      deck,
      players,
      currentPlayerId: 'player',
      trump: null,
      table: {
        attackCards: [],
        defendCards: [],
      },
      phase: 'setup',
      winner: null,
      cardsInDeck: deck.length,
      gameStarted: false,
    };
  }

  public getState(): GameState {
    return { ...this.state };
  }

  public startGame(): void {
    // Reset deck and deal cards
    this.state.deck = createDeck();
    this.state.players.forEach(player => {
      player.hand = [];
    });

    // Deal initial hands
    for (const player of this.state.players) {
      const { dealtCards, remainingDeck } = dealCards(this.state.deck, this.INITIAL_HAND_SIZE);
      player.hand = dealtCards;
      this.state.deck = remainingDeck;
    }

    // Set trump card
    if (this.state.deck.length > 0) {
      this.state.trump = this.state.deck[0];
      this.state.deck = this.state.deck.slice(1);
    }

    this.state.cardsInDeck = this.state.deck.length;
    this.state.gameStarted = true;
    this.state.phase = 'attack';
    
    // Determine who starts (player with lowest trump)
    this.determineFirstPlayer();
  }

  private determineFirstPlayer(): void {
    if (!this.state.trump) {
      this.state.currentPlayerId = 'player';
      return;
    }

    const playerLowestTrump = getLowestTrump(this.getPlayer('player').hand, this.state.trump);
    const computerLowestTrump = getLowestTrump(this.getPlayer('computer').hand, this.state.trump);

    if (playerLowestTrump && computerLowestTrump) {
      this.state.currentPlayerId = playerLowestTrump.value < computerLowestTrump.value ? 'player' : 'computer';
    } else if (playerLowestTrump) {
      this.state.currentPlayerId = 'player';
    } else if (computerLowestTrump) {
      this.state.currentPlayerId = 'computer';
    } else {
      this.state.currentPlayerId = 'player';
    }
  }

  public playCard(cardId: string): boolean {
    const currentPlayer = this.getCurrentPlayer();
    const cardIndex = currentPlayer.hand.findIndex(card => card.id === cardId);
    
    if (cardIndex === -1) return false;

    const card = currentPlayer.hand[cardIndex];

    if (this.state.phase === 'attack') {
      if (this.canPlayCardInAttack(card)) {
        this.state.table.attackCards.push(card);
        currentPlayer.hand.splice(cardIndex, 1);
        this.state.phase = 'defend';
        this.switchPlayer();
        return true;
      }
    }

    return false;
  }

  public defendCard(attackCardId: string, defendCardId: string): boolean {
    const currentPlayer = this.getCurrentPlayer();
    const defendCardIndex = currentPlayer.hand.findIndex(card => card.id === defendCardId);
    
    if (defendCardIndex === -1) return false;

    const defendCard = currentPlayer.hand[defendCardIndex];
    const attackCard = this.state.table.attackCards.find(card => card.id === attackCardId);

    if (!attackCard) return false;

    if (canBeatCard(attackCard, defendCard, this.state.trump)) {
      this.state.table.defendCards.push(defendCard);
      currentPlayer.hand.splice(defendCardIndex, 1);
      
      // Check if all attack cards are defended
      if (this.state.table.attackCards.length === this.state.table.defendCards.length) {
        this.state.phase = 'cleanup';
        this.cleanupTable();
      }
      
      return true;
    }

    return false;
  }

  public takeCards(): void {
    const currentPlayer = this.getCurrentPlayer();
    
    // Add all table cards to current player's hand
    currentPlayer.hand.push(...this.state.table.attackCards, ...this.state.table.defendCards);
    
    this.state.table.attackCards = [];
    this.state.table.defendCards = [];
    this.state.phase = 'attack';
    
    // Attacker continues
    this.switchPlayer();
    this.refillHands();
  }

  public finishTurn(): void {
    if (this.state.phase === 'attack' && this.state.table.attackCards.length > 0) {
      this.state.phase = 'defend';
      this.switchPlayer();
    } else if (this.state.phase === 'defend') {
      this.takeCards();
    }
  }

  private cleanupTable(): void {
    this.state.table.attackCards = [];
    this.state.table.defendCards = [];
    this.state.phase = 'attack';
    this.refillHands();
    this.checkGameEnd();
  }

  private refillHands(): void {
    for (const player of this.state.players) {
      const cardsNeeded = Math.max(0, this.INITIAL_HAND_SIZE - player.hand.length);
      const cardsToTake = Math.min(cardsNeeded, this.state.deck.length);
      
      if (cardsToTake > 0) {
        const { dealtCards, remainingDeck } = dealCards(this.state.deck, cardsToTake);
        player.hand.push(...dealtCards);
        this.state.deck = remainingDeck;
      }
    }
    
    this.state.cardsInDeck = this.state.deck.length;
  }

  private checkGameEnd(): void {
    for (const player of this.state.players) {
      if (player.hand.length === 0 && this.state.deck.length === 0) {
        this.state.winner = player.id;
        this.state.phase = 'gameOver';
        player.wins++;
        return;
      }
    }
  }

  private canPlayCardInAttack(card: Card): boolean {
    return canAddToAttack(card, [...this.state.table.attackCards, ...this.state.table.defendCards]);
  }

  private getCurrentPlayer(): Player {
    return this.getPlayer(this.state.currentPlayerId);
  }

  private getPlayer(playerId: string): Player {
    const player = this.state.players.find(p => p.id === playerId);
    if (!player) throw new Error(`Player ${playerId} not found`);
    return player;
  }

  private switchPlayer(): void {
    this.state.currentPlayerId = this.state.currentPlayerId === 'player' ? 'computer' : 'player';
  }

  public resetGame(): void {
    const playerName = this.getPlayer('player').name;
    const wins = this.state.players.reduce((acc, player) => {
      acc[player.id] = player.wins;
      return acc;
    }, {} as Record<string, number>);

    this.state = this.createInitialState(playerName);
    
    // Restore win counts
    for (const player of this.state.players) {
      player.wins = wins[player.id] || 0;
    }
  }

  // Computer AI methods
  public makeComputerMove(): void {
    if (this.state.currentPlayerId !== 'computer') return;

    setTimeout(() => {
      if (this.state.phase === 'attack') {
        this.makeComputerAttack();
      } else if (this.state.phase === 'defend') {
        this.makeComputerDefense();
      }
    }, 1000); // Add delay for better UX
  }

  private makeComputerAttack(): void {
    const computer = this.getPlayer('computer');
    const validCards = computer.hand.filter(card => this.canPlayCardInAttack(card));
    
    if (validCards.length > 0) {
      // Simple AI: play lowest value card
      const cardToPlay = validCards.reduce((lowest, card) => 
        card.value < lowest.value ? card : lowest
      );
      this.playCard(cardToPlay.id);
    }
  }

  private makeComputerDefense(): void {
    const computer = this.getPlayer('computer');
    const attackCard = this.state.table.attackCards[this.state.table.defendCards.length];
    
    if (!attackCard) return;

    const validDefenseCards = computer.hand.filter(card => 
      canBeatCard(attackCard, card, this.state.trump)
    );

    if (validDefenseCards.length > 0) {
      // Simple AI: use lowest card that can defend
      const cardToPlay = validDefenseCards.reduce((lowest, card) => 
        card.value < lowest.value ? card : lowest
      );
      this.defendCard(attackCard.id, cardToPlay.id);
    } else {
      this.takeCards();
    }
  }
}