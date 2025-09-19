import React, { useState } from 'react';
import './GameMenu.css';

interface GameMenuProps {
  onStartGame: (playerName: string, enableNotifications: boolean) => void;
}

export const GameMenu: React.FC<GameMenuProps> = ({ onStartGame }) => {
  const [playerName, setPlayerName] = useState('GUEST');
  const [enableNotifications, setEnableNotifications] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartGame(playerName.trim() || 'GUEST', enableNotifications);
  };

  return (
    <div className="game-menu">
      <div className="menu-container">
        <div className="menu-header">
          <img src="/img/banner.jpg" alt="Durak Game" className="banner" />
        </div>
        
        <form onSubmit={handleSubmit} className="menu-form">
          <h3 className="menu-title">- New Game -</h3>
          
          <div className="form-group">
            <label htmlFor="playerName">You Are:</label>
            <input
              id="playerName"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="form-input"
              placeholder="Enter your name"
              maxLength={20}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="notifications">
              <input
                id="notifications"
                type="checkbox"
                checked={enableNotifications}
                onChange={(e) => setEnableNotifications(e.target.checked)}
                className="form-checkbox"
              />
              Enable explanations
            </label>
          </div>
          
          <button type="submit" className="start-button">
            Start Game
          </button>
        </form>
        
        <div className="menu-footer">
          <p>Created By Deniss Strods 2015 C.</p>
          <p>Email: denmantm@inbox.lv</p>
          <p>Converted to React 2024</p>
        </div>
      </div>
    </div>
  );
};