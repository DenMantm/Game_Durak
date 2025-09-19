import { describe, it, expect } from 'vitest';
import {
  createDeck,
  shuffleDeck,
  dealCards,
  canBeatCard,
  canAddToAttack,
  getLowestTrump,
  formatCardValue,
  getCardImagePath,
} from '../../utils/cardUtils';
import type { Card } from '../../types/game';

describe('cardUtils', () => {
  describe('createDeck', () => {
    it('should create a deck with 36 cards (6-Ace for each suit)', () => {
      const deck = createDeck();
      expect(deck).toHaveLength(36); // 4 suits * 9 values (6-14)
    });

    it('should include all suits', () => {
      const deck = createDeck();
      const suits = deck.map(card => card.suit);
      expect(suits).toContain('c');
      expect(suits).toContain('d');
      expect(suits).toContain('h');
      expect(suits).toContain('s');
    });

    it('should include values from 6 to 14', () => {
      const deck = createDeck();
      const values = deck.map(card => card.value);
      for (let i = 6; i <= 14; i++) {
        expect(values).toContain(i);
      }
    });

    it('should have unique card IDs', () => {
      const deck = createDeck();
      const ids = deck.map(card => card.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(deck.length);
    });
  });

  describe('shuffleDeck', () => {
    it('should return a deck with the same length', () => {
      const originalDeck = createDeck();
      const shuffledDeck = shuffleDeck(originalDeck);
      expect(shuffledDeck).toHaveLength(originalDeck.length);
    });

    it('should contain the same cards', () => {
      const originalDeck = createDeck();
      const shuffledDeck = shuffleDeck(originalDeck);
      const originalIds = originalDeck.map(card => card.id).sort();
      const shuffledIds = shuffledDeck.map(card => card.id).sort();
      expect(shuffledIds).toEqual(originalIds);
    });

    it('should not modify the original deck', () => {
      const originalDeck = createDeck();
      const originalLength = originalDeck.length;
      shuffleDeck(originalDeck);
      expect(originalDeck).toHaveLength(originalLength);
    });
  });

  describe('dealCards', () => {
    it('should deal the requested number of cards', () => {
      const deck = createDeck();
      const { dealtCards, remainingDeck } = dealCards(deck, 6);
      expect(dealtCards).toHaveLength(6);
      expect(remainingDeck).toHaveLength(deck.length - 6);
    });

    it('should deal cards from the top of the deck', () => {
      const deck = createDeck();
      const topCards = deck.slice(0, 3);
      const { dealtCards } = dealCards(deck, 3);
      expect(dealtCards).toEqual(topCards);
    });
  });

  describe('canBeatCard', () => {
    const trump: Card = { id: '6s', value: 6, suit: 's' };

    it('should allow higher value of same suit to beat lower value', () => {
      const attackCard: Card = { id: '7h', value: 7, suit: 'h' };
      const defendCard: Card = { id: '10h', value: 10, suit: 'h' };
      expect(canBeatCard(attackCard, defendCard, trump)).toBe(true);
    });

    it('should not allow lower value of same suit to beat higher value', () => {
      const attackCard: Card = { id: '10h', value: 10, suit: 'h' };
      const defendCard: Card = { id: '7h', value: 7, suit: 'h' };
      expect(canBeatCard(attackCard, defendCard, trump)).toBe(false);
    });

    it('should allow trump to beat non-trump', () => {
      const attackCard: Card = { id: '14h', value: 14, suit: 'h' }; // Ace of hearts
      const defendCard: Card = { id: '6s', value: 6, suit: 's' }; // 6 of spades (trump)
      expect(canBeatCard(attackCard, defendCard, trump)).toBe(true);
    });

    it('should not allow non-trump to beat trump', () => {
      const attackCard: Card = { id: '6s', value: 6, suit: 's' }; // 6 of spades (trump)
      const defendCard: Card = { id: '14h', value: 14, suit: 'h' }; // Ace of hearts
      expect(canBeatCard(attackCard, defendCard, trump)).toBe(false);
    });

    it('should not allow different non-trump suits to beat each other', () => {
      const attackCard: Card = { id: '7h', value: 7, suit: 'h' };
      const defendCard: Card = { id: '10c', value: 10, suit: 'c' };
      expect(canBeatCard(attackCard, defendCard, trump)).toBe(false);
    });
  });

  describe('canAddToAttack', () => {
    it('should allow any card when table is empty', () => {
      const card: Card = { id: '7h', value: 7, suit: 'h' };
      expect(canAddToAttack(card, [])).toBe(true);
    });

    it('should allow card with same value as table cards', () => {
      const tableCards: Card[] = [
        { id: '7h', value: 7, suit: 'h' },
        { id: '7c', value: 7, suit: 'c' },
      ];
      const card: Card = { id: '7s', value: 7, suit: 's' };
      expect(canAddToAttack(card, tableCards)).toBe(true);
    });

    it('should not allow card with different value from table cards', () => {
      const tableCards: Card[] = [
        { id: '7h', value: 7, suit: 'h' },
        { id: '7c', value: 7, suit: 'c' },
      ];
      const card: Card = { id: '8s', value: 8, suit: 's' };
      expect(canAddToAttack(card, tableCards)).toBe(false);
    });
  });

  describe('getLowestTrump', () => {
    const trump: Card = { id: '6s', value: 6, suit: 's' };

    it('should return the lowest trump card', () => {
      const hand: Card[] = [
        { id: '10s', value: 10, suit: 's' },
        { id: '7h', value: 7, suit: 'h' },
        { id: '8s', value: 8, suit: 's' },
        { id: '14s', value: 14, suit: 's' },
      ];
      const result = getLowestTrump(hand, trump);
      expect(result).toEqual({ id: '8s', value: 8, suit: 's' });
    });

    it('should return null when no trump cards in hand', () => {
      const hand: Card[] = [
        { id: '7h', value: 7, suit: 'h' },
        { id: '8c', value: 8, suit: 'c' },
        { id: '9d', value: 9, suit: 'd' },
      ];
      const result = getLowestTrump(hand, trump);
      expect(result).toBeNull();
    });

    it('should return null when trump is null', () => {
      const hand: Card[] = [
        { id: '7h', value: 7, suit: 'h' },
        { id: '8s', value: 8, suit: 's' },
      ];
      const result = getLowestTrump(hand, null);
      expect(result).toBeNull();
    });
  });

  describe('formatCardValue', () => {
    it('should format face cards correctly', () => {
      expect(formatCardValue(11)).toBe('J');
      expect(formatCardValue(12)).toBe('Q');
      expect(formatCardValue(13)).toBe('K');
      expect(formatCardValue(14)).toBe('A');
    });

    it('should format number cards as strings', () => {
      expect(formatCardValue(6)).toBe('6');
      expect(formatCardValue(7)).toBe('7');
      expect(formatCardValue(10)).toBe('10');
    });
  });

  describe('getCardImagePath', () => {
    it('should return correct image path', () => {
      const card: Card = { id: '7h', value: 7, suit: 'h' };
      expect(getCardImagePath(card)).toBe('/icon/7h.png');
    });

    it('should work with face cards', () => {
      const card: Card = { id: '14s', value: 14, suit: 's' };
      expect(getCardImagePath(card)).toBe('/icon/14s.png');
    });
  });
});