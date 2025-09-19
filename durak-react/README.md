# Durak Card Game - React Version

A modern React TypeScript implementation of the classic Russian card game Durak (Дурак).

## Features

- ⚛️ **Modern React with TypeScript** - Full type safety and modern development practices
- 🎮 **Complete Game Logic** - Faithful implementation of Durak rules
- 🤖 **AI Opponent** - Play against a computer opponent
- 🧪 **Comprehensive Tests** - 50+ unit and integration tests
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Beautiful UI** - Modern, intuitive interface with animations
- 🚀 **Fast Development** - Vite-powered development server

## Game Rules

Durak is a classic Russian card game for 2-6 players (this implementation supports 1 player vs computer). The objective is to get rid of all your cards. The last player with cards is the "durak" (fool).

### Basic Rules:
- Uses a 36-card deck (6, 7, 8, 9, 10, J, Q, K, A for each suit)
- Players start with 6 cards each
- One card is revealed as the trump suit
- Players take turns attacking and defending
- Attacks must be defended with higher cards of the same suit or trump cards
- If you can't defend, you must take all cards from the table

## Technology Stack

- **Frontend**: React 19, TypeScript, CSS3
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library
- **Linting**: ESLint with TypeScript rules
- **Type Checking**: TypeScript 5.8

## Project Structure

```
durak-react/
├── src/
│   ├── components/           # React components
│   │   ├── Card.tsx         # Individual card component
│   │   ├── GameBoard.tsx    # Main game interface
│   │   └── GameMenu.tsx     # Start menu
│   ├── game/                # Game logic
│   │   └── DurakGame.ts     # Core game engine
│   ├── types/               # TypeScript type definitions
│   │   └── game.ts          # Game-related types
│   ├── utils/               # Utility functions
│   │   └── cardUtils.ts     # Card manipulation utilities
│   ├── __tests__/           # Test files
│   │   ├── components/      # Component tests
│   │   ├── game/           # Game logic tests
│   │   └── utils/          # Utility tests
│   └── App.tsx             # Main application component
├── public/                 # Static assets
│   ├── icon/              # Card images
│   └── img/               # Game images
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Game_Durak/durak-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint

## Testing

The project includes comprehensive tests covering:

- **Unit Tests**: Game logic, utility functions, and individual components
- **Integration Tests**: Game flow and component interactions
- **Type Safety**: Full TypeScript coverage

Run tests with:
```bash
npm test
```

## Architecture

### Modular Design
The game is built with a modular architecture:

- **Game Engine** (`DurakGame.ts`): Core game logic, rules, and state management
- **Card Utilities** (`cardUtils.ts`): Pure functions for card operations
- **React Components**: Reusable UI components with clear separation of concerns
- **Type Safety**: Comprehensive TypeScript types for all game entities

### State Management
- Game state is managed by the `DurakGame` class
- React components use local state for UI concerns
- Clean separation between game logic and presentation

### AI Implementation
- Simple but effective computer opponent
- Configurable difficulty (extensible for future enhancements)
- Realistic gameplay decisions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## Conversion Notes

This React version is a complete rewrite of the original jQuery-based game, featuring:

- ✅ Modern React with hooks and functional components
- ✅ TypeScript for type safety
- ✅ Modular architecture replacing monolithic JavaScript
- ✅ Comprehensive test suite (52 tests)
- ✅ Modern build tools (Vite)
- ✅ ESLint for code quality
- ✅ Responsive design
- ✅ Clean separation of concerns

## Original Credits

Original game created by Deniss Strods (2015)  
Email: denmantm@inbox.lv  
React conversion: 2024

## License

This project is open source and available under the MIT License.
