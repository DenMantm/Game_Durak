import type { Card } from '../types/game';

/**
 * Creates a standard 52-card deck (excluding 2-5s for Durak)
 */
export function createDeck(): Card[] {
  const suits: Array<'c' | 'd' | 'h' | 's'> = ['c', 'd', 'h', 's'];
  const deck: Card[] = [];

  // Durak typically uses cards 6-Ace (value 6-14)
  for (const suit of suits) {
    for (let value = 6; value <= 14; value++) {
      deck.push({
        value,
        suit,
        id: `${value}${suit}`,
        selected: false,
      });
    }
  }

  return shuffleDeck(deck);
}

/**
 * Shuffles the deck using Fisher-Yates algorithm
 */
export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Deals cards to players from the deck
 */
export function dealCards(deck: Card[], numCards: number): { dealtCards: Card[]; remainingDeck: Card[] } {
  const dealtCards = deck.slice(0, numCards);
  const remainingDeck = deck.slice(numCards);
  return { dealtCards, remainingDeck };
}

/**
 * Determines if a card can beat another card
 */
export function canBeatCard(attackCard: Card, defendCard: Card, trump: Card | null): boolean {
  // Same suit: higher value wins
  if (attackCard.suit === defendCard.suit) {
    return defendCard.value > attackCard.value;
  }
  
  // Trump beats non-trump
  if (trump && defendCard.suit === trump.suit && attackCard.suit !== trump.suit) {
    return true;
  }
  
  return false;
}

/**
 * Checks if a card can be added to the attack (same value as cards on table)
 */
export function canAddToAttack(card: Card, tableCards: Card[]): boolean {
  if (tableCards.length === 0) return true;
  
  const tableValues = new Set(tableCards.map(c => c.value));
  return tableValues.has(card.value);
}

/**
 * Gets the lowest trump card from hand
 */
export function getLowestTrump(hand: Card[], trump: Card | null): Card | null {
  if (!trump) return null;
  
  const trumpCards = hand.filter(card => card.suit === trump.suit);
  if (trumpCards.length === 0) return null;
  
  return trumpCards.reduce((lowest, card) => 
    card.value < lowest.value ? card : lowest
  );
}

/**
 * Formats card value for display
 */
export function formatCardValue(value: number): string {
  switch (value) {
    case 11: return 'J';
    case 12: return 'Q';
    case 13: return 'K';
    case 14: return 'A';
    default: return value.toString();
  }
}

/**
 * Gets the card image path
 */
export function getCardImagePath(card: Card): string {
  return `/icon/${card.id}.png`;
}