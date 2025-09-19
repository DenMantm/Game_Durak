import React, { useState, useEffect, useCallback } from 'react';
import { DurakGame } from '../game/DurakGame';
import type { GameState } from '../types/game';
import { Card } from './Card';
import './GameBoard.css';

interface GameBoardProps {
  playerName: string;
  onGameStateChange?: (state: GameState) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ playerName, onGameStateChange }) => {
  const [game] = useState(() => new DurakGame(playerName));
  const [gameState, setGameState] = useState<GameState>(game.getState());
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('Click "New Game" to start!');

  useEffect(() => {
    if (onGameStateChange) {
      onGameStateChange(gameState);
    }
  }, [gameState, onGameStateChange]);

  const updateGameState = useCallback(() => {
    const newState = game.getState();
    setGameState(newState);
    updateMessage(newState);
  }, [game]);

  useEffect(() => {
    if (gameState.currentPlayerId === 'computer' && gameState.gameStarted) {
      game.makeComputerMove();
      updateGameState();
    }
  }, [gameState.currentPlayerId, gameState.phase, gameState.gameStarted, game, updateGameState]);

  const updateMessage = (state: GameState) => {
    if (state.phase === 'gameOver') {
      const winner = state.players.find(p => p.id === state.winner);
      setMessage(`Game Over! ${winner?.name} wins!`);
    } else if (state.currentPlayerId === 'player') {
      if (state.phase === 'attack') {
        setMessage("Your turn - Make an attack");
      } else if (state.phase === 'defend') {
        setMessage("Your turn - Defend or take cards");
      }
    } else {
      setMessage("Computer's turn");
    }
  };

  const handleNewGame = () => {
    game.startGame();
    updateGameState();
    setSelectedCard(null);
  };

  const handleCardClick = (cardId: string) => {
    if (gameState.currentPlayerId !== 'player') return;

    if (selectedCard === cardId) {
      setSelectedCard(null);
      return;
    }

    setSelectedCard(cardId);
  };

  const handlePlayCard = () => {
    if (!selectedCard || gameState.currentPlayerId !== 'player') return;

    const success = game.playCard(selectedCard);
    if (success) {
      setSelectedCard(null);
      updateGameState();
    }
  };

  const handleDefendCard = (attackCardId: string) => {
    if (!selectedCard || gameState.currentPlayerId !== 'player') return;

    const success = game.defendCard(attackCardId, selectedCard);
    if (success) {
      setSelectedCard(null);
      updateGameState();
    }
  };

  const handleTakeCards = () => {
    game.takeCards();
    setSelectedCard(null);
    updateGameState();
  };

  const handleFinishTurn = () => {
    game.finishTurn();
    setSelectedCard(null);
    updateGameState();
  };

  const playerHand = gameState.players.find(p => p.id === 'player')?.hand || [];
  const computerHand = gameState.players.find(p => p.id === 'computer')?.hand || [];

  return (
    <div className="game-board">
      <div className="game-header">
        <h1>Durak Card Game</h1>
        <div className="game-info">
          <div className="deck-info">
            Cards in deck: {gameState.cardsInDeck}
            {gameState.trump && (
              <div className="trump-card">
                Trump: <Card card={gameState.trump} className="card--trump" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="computer-area">
        <div className="player-info">
          <h3>Computer</h3>
          <p>Cards: {computerHand.length}</p>
          <p>Wins: {gameState.players.find(p => p.id === 'computer')?.wins || 0}</p>
        </div>
        <div className="computer-hand">
          {computerHand.map((card) => (
            <Card
              key={card.id}
              card={card}
              isHidden={true}
            />
          ))}
        </div>
      </div>

      <div className="table-area">
        <div className="status-message">{message}</div>
        
        {gameState.gameStarted && (
          <div className="game-controls">
            {gameState.currentPlayerId === 'player' && (
              <>
                {gameState.phase === 'attack' && selectedCard && (
                  <button onClick={handlePlayCard} className="btn btn-primary">
                    Play Card
                  </button>
                )}
                {gameState.phase === 'defend' && (
                  <>
                    <button onClick={handleTakeCards} className="btn btn-warning">
                      Take Cards
                    </button>
                  </>
                )}
                <button onClick={handleFinishTurn} className="btn btn-secondary">
                  Finish Turn
                </button>
              </>
            )}
          </div>
        )}

        <div className="table-cards">
          <div className="attack-cards">
            <h4>Attack Cards:</h4>
            {gameState.table.attackCards.map((card) => (
              <Card
                key={card.id}
                card={card}
                className="card--on-table"
                onClick={() => gameState.phase === 'defend' && handleDefendCard(card.id)}
              />
            ))}
          </div>
          
          <div className="defend-cards">
            <h4>Defense Cards:</h4>
            {gameState.table.defendCards.map((card) => (
              <Card
                key={card.id}
                card={card}
                className="card--on-table"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="player-area">
        <div className="player-info">
          <h3>{playerName}</h3>
          <p>Cards: {playerHand.length}</p>
          <p>Wins: {gameState.players.find(p => p.id === 'player')?.wins || 0}</p>
        </div>
        
        <div className="player-hand">
          {playerHand.map((card) => (
            <Card
              key={card.id}
              card={card}
              isSelected={selectedCard === card.id}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </div>
      </div>

      <div className="game-actions">
        <button onClick={handleNewGame} className="btn btn-success">
          {gameState.gameStarted ? 'New Game' : 'Start Game'}
        </button>
      </div>
    </div>
  );
};