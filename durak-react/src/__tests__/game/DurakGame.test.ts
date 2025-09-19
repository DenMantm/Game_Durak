import { describe, it, expect, beforeEach } from 'vitest';
import { DurakGame } from '../../game/DurakGame';

describe('DurakGame', () => {
  let game: DurakGame;

  beforeEach(() => {
    game = new DurakGame('TestPlayer');
  });

  describe('initialization', () => {
    it('should create a game with initial state', () => {
      const state = game.getState();
      expect(state.players).toHaveLength(2);
      expect(state.players[0].name).toBe('TestPlayer');
      expect(state.players[0].isComputer).toBe(false);
      expect(state.players[1].name).toBe('Computer');
      expect(state.players[1].isComputer).toBe(true);
      expect(state.phase).toBe('setup');
      expect(state.gameStarted).toBe(false);
    });

    it('should have empty hands initially', () => {
      const state = game.getState();
      expect(state.players[0].hand).toHaveLength(0);
      expect(state.players[1].hand).toHaveLength(0);
    });
  });

  describe('startGame', () => {
    it('should deal initial hands to both players', () => {
      game.startGame();
      const state = game.getState();
      
      expect(state.players[0].hand).toHaveLength(6);
      expect(state.players[1].hand).toHaveLength(6);
      expect(state.gameStarted).toBe(true);
      expect(state.phase).toBe('attack');
    });

    it('should set a trump card', () => {
      game.startGame();
      const state = game.getState();
      
      expect(state.trump).toBeTruthy();
      expect(state.trump).toHaveProperty('suit');
      expect(state.trump).toHaveProperty('value');
    });

    it('should have cards remaining in deck after dealing', () => {
      game.startGame();
      const state = game.getState();
      
      // 36 total cards - 12 dealt (6 each) - 1 trump = 23 remaining
      expect(state.cardsInDeck).toBe(23);
    });

    it('should determine a starting player', () => {
      game.startGame();
      const state = game.getState();
      
      expect(['player', 'computer']).toContain(state.currentPlayerId);
    });
  });

  describe('playCard', () => {
    beforeEach(() => {
      game.startGame();
    });

    it('should not allow playing invalid card', () => {
      const result = game.playCard('invalid-card-id');
      expect(result).toBe(false);
    });

    it('should allow playing valid card during attack phase', () => {
      const state = game.getState();
      const currentPlayer = state.players.find(p => p.id === state.currentPlayerId);
      
      if (currentPlayer && currentPlayer.hand.length > 0 && state.phase === 'attack') {
        const cardToPlay = currentPlayer.hand[0];
        const result = game.playCard(cardToPlay.id);
        expect(result).toBe(true);
        
        const newState = game.getState();
        expect(newState.table.attackCards).toHaveLength(1);
        expect(newState.phase).toBe('defend');
      }
    });

    it('should switch players after valid attack', () => {
      const state = game.getState();
      const initialPlayer = state.currentPlayerId;
      const currentPlayer = state.players.find(p => p.id === initialPlayer);
      
      if (currentPlayer && currentPlayer.hand.length > 0 && state.phase === 'attack') {
        const cardToPlay = currentPlayer.hand[0];
        game.playCard(cardToPlay.id);
        
        const newState = game.getState();
        expect(newState.currentPlayerId).not.toBe(initialPlayer);
      }
    });
  });

  describe('resetGame', () => {
    it('should reset game to initial state but preserve wins', () => {
      game.startGame();
      const state = game.getState();
      
      // Simulate a win
      state.players[0].wins = 1;
      
      game.resetGame();
      const resetState = game.getState();
      
      expect(resetState.gameStarted).toBe(false);
      expect(resetState.phase).toBe('setup');
      expect(resetState.players[0].hand).toHaveLength(0);
      expect(resetState.players[1].hand).toHaveLength(0);
      expect(resetState.players[0].wins).toBe(1); // Wins should be preserved
    });
  });

  describe('takeCards', () => {
    beforeEach(() => {
      game.startGame();
    });

    it('should add all table cards to current player hand', () => {
      const state = game.getState();
      
      // Mock some cards on the table
      state.table.attackCards = [
        { id: '7h', value: 7, suit: 'h' },
        { id: '8c', value: 8, suit: 'c' }
      ];
      state.table.defendCards = [
        { id: '9s', value: 9, suit: 's' }
      ];
      
      const currentPlayer = state.players.find(p => p.id === state.currentPlayerId);
      const initialHandSize = currentPlayer?.hand.length || 0;
      
      game.takeCards();
      
      const newState = game.getState();
      const newCurrentPlayer = newState.players.find(p => p.id === state.currentPlayerId);
      
      expect(newCurrentPlayer?.hand.length).toBe(initialHandSize + 3);
      expect(newState.table.attackCards).toHaveLength(0);
      expect(newState.table.defendCards).toHaveLength(0);
    });
  });

  describe('game flow', () => {
    it('should maintain consistent game state through multiple moves', () => {
      game.startGame();
      
      for (let i = 0; i < 5; i++) {
        const state = game.getState();
        
        // Basic state validations
        expect(state.players).toHaveLength(2);
        expect(['setup', 'attack', 'defend', 'cleanup', 'gameOver']).toContain(state.phase);
        expect(['player', 'computer']).toContain(state.currentPlayerId);
        
        // Validate hand sizes are reasonable
        expect(state.players[0].hand.length).toBeGreaterThanOrEqual(0);
        expect(state.players[1].hand.length).toBeGreaterThanOrEqual(0);
        
        // Validate deck consistency
        expect(state.cardsInDeck).toBeGreaterThanOrEqual(0);
        expect(state.cardsInDeck).toBeLessThanOrEqual(36);
        
        // Try to make a move if possible
        const currentPlayer = state.players.find(p => p.id === state.currentPlayerId);
        if (currentPlayer && currentPlayer.hand.length > 0 && state.phase === 'attack') {
          const cardToPlay = currentPlayer.hand[0];
          game.playCard(cardToPlay.id);
        } else if (state.phase === 'defend') {
          game.takeCards(); // Simple strategy for testing
        }
      }
    });
  });
});