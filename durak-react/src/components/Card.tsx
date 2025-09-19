import React from 'react';
import type { Card as CardType } from '../types/game';
import { getCardImagePath, formatCardValue } from '../utils/cardUtils';
import './Card.css';

interface CardProps {
  card: CardType;
  isHidden?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  card,
  isHidden = false,
  isSelected = false,
  onClick,
  style,
  className = '',
}) => {
  const cardClasses = [
    'card',
    isSelected ? 'card--selected' : '',
    onClick ? 'card--clickable' : '',
    className,
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={cardClasses}
      onClick={handleClick}
      style={style}
      data-testid={`card-${card.id}`}
    >
      {isHidden ? (
        <img
          src="/icon/back.png"
          alt="Hidden card"
          className="card__image"
        />
      ) : (
        <img
          src={getCardImagePath(card)}
          alt={`${formatCardValue(card.value)} of ${card.suit}`}
          className="card__image"
        />
      )}
      {isSelected && <div className="card__selection-indicator" />}
    </div>
  );
};