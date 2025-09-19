export interface Card {
  value: number; // 2-14 (J=11, Q=12, K=13, A=14)
  suit: 'c' | 'd' | 'h' | 's'; // clubs, diamonds, hearts, spades
  id: string; // e.g., "10h", "Ac"
  selected?: boolean;
  position?: { x: number; y: number };
}

export interface Player {
  id: string;
  name: string;
  hand: Card[];
  wins: number;
  isComputer: boolean;
}

export interface GameState {
  deck: Card[];
  players: Player[];
  currentPlayerId: string;
  trump: Card | null;
  table: {
    attackCards: Card[];
    defendCards: Card[];
  };
  phase: 'setup' | 'attack' | 'defend' | 'cleanup' | 'gameOver';
  winner: string | null;
  cardsInDeck: number;
  gameStarted: boolean;
}

export interface GameAction {
  type: 'START_GAME' | 'PLAY_CARD' | 'DEFEND_CARD' | 'TAKE_CARDS' | 'FINISH_TURN' | 'RESET_GAME';
  payload?: unknown;
}

export interface DurakGameConfig {
  playerName: string;
  enableNotifications: boolean;
}