import { useState } from 'react'
import { GameMenu } from './components/GameMenu'
import { GameBoard } from './components/GameBoard'
import './App.css'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [playerName, setPlayerName] = useState('GUEST')
  const [enableNotifications, setEnableNotifications] = useState(true)

  const handleStartGame = (name: string, notifications: boolean) => {
    setPlayerName(name)
    setEnableNotifications(notifications)
    setGameStarted(true)
  }

  const handleGameStateChange = () => {
    // Handle any global game state changes here
    if (enableNotifications) {
      // Could add notification logic here
    }
  }

  const handleBackToMenu = () => {
    setGameStarted(false)
  }

  return (
    <div className="app">
      {!gameStarted ? (
        <GameMenu onStartGame={handleStartGame} />
      ) : (
        <div>
          <button 
            onClick={handleBackToMenu} 
            className="back-to-menu-btn"
          >
            ← Back to Menu
          </button>
          <GameBoard 
            playerName={playerName} 
            onGameStateChange={handleGameStateChange}
          />
        </div>
      )}
    </div>
  )
}

export default App
