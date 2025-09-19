import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '../../components/Card';
import type { Card as CardType } from '../../types/game';

describe('Card Component', () => {
  const mockCard: CardType = {
    id: '7h',
    value: 7,
    suit: 'h'
  };

  it('should render card with correct image', () => {
    render(<Card card={mockCard} />);
    
    const cardImage = screen.getByAltText('7 of h');
    expect(cardImage).toBeInTheDocument();
    expect(cardImage).toHaveAttribute('src', '/icon/7h.png');
  });

  it('should render hidden card when isHidden is true', () => {
    render(<Card card={mockCard} isHidden={true} />);
    
    const cardImage = screen.getByAltText('Hidden card');
    expect(cardImage).toBeInTheDocument();
    expect(cardImage).toHaveAttribute('src', '/icon/back.png');
  });

  it('should show selection indicator when selected', () => {
    render(<Card card={mockCard} isSelected={true} />);
    
    const card = screen.getByTestId('card-7h');
    expect(card).toHaveClass('card--selected');
    
    const selectionIndicator = card.querySelector('.card__selection-indicator');
    expect(selectionIndicator).toBeInTheDocument();
  });

  it('should call onClick when clicked and clickable', () => {
    const mockOnClick = vi.fn();
    render(<Card card={mockCard} onClick={mockOnClick} />);
    
    const card = screen.getByTestId('card-7h');
    expect(card).toHaveClass('card--clickable');
    
    fireEvent.click(card);
    expect(mockOnClick).toHaveBeenCalledOnce();
  });

  it('should not be clickable when no onClick provided', () => {
    render(<Card card={mockCard} />);
    
    const card = screen.getByTestId('card-7h');
    expect(card).not.toHaveClass('card--clickable');
  });

  it('should apply custom className and style', () => {
    const customStyle = { marginTop: '10px' };
    render(
      <Card 
        card={mockCard} 
        className="custom-class" 
        style={customStyle}
      />
    );
    
    const card = screen.getByTestId('card-7h');
    expect(card).toHaveClass('custom-class');
    expect(card).toHaveStyle('margin-top: 10px');
  });

  it('should format face card values correctly', () => {
    const aceCard: CardType = { id: '14s', value: 14, suit: 's' };
    render(<Card card={aceCard} />);
    
    const cardImage = screen.getByAltText('A of s');
    expect(cardImage).toBeInTheDocument();
  });

  it('should handle Jack, Queen, King correctly', () => {
    const jackCard: CardType = { id: '11c', value: 11, suit: 'c' };
    const queenCard: CardType = { id: '12d', value: 12, suit: 'd' };
    const kingCard: CardType = { id: '13h', value: 13, suit: 'h' };

    const { rerender } = render(<Card card={jackCard} />);
    expect(screen.getByAltText('J of c')).toBeInTheDocument();

    rerender(<Card card={queenCard} />);
    expect(screen.getByAltText('Q of d')).toBeInTheDocument();

    rerender(<Card card={kingCard} />);
    expect(screen.getByAltText('K of h')).toBeInTheDocument();
  });
});