import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameMenu } from '../../components/GameMenu';

describe('GameMenu Component', () => {
  const mockOnStartGame = vi.fn();

  beforeEach(() => {
    mockOnStartGame.mockClear();
  });

  it('should render menu with default values', () => {
    render(<GameMenu onStartGame={mockOnStartGame} />);
    
    expect(screen.getByDisplayValue('GUEST')).toBeInTheDocument();
    expect(screen.getByLabelText(/enable explanations/i)).toBeChecked();
    expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument();
  });

  it('should allow player name input', () => {
    render(<GameMenu onStartGame={mockOnStartGame} />);
    
    const nameInput = screen.getByDisplayValue('GUEST');
    fireEvent.change(nameInput, { target: { value: 'TestPlayer' } });
    
    expect(nameInput).toHaveValue('TestPlayer');
  });

  it('should toggle notifications checkbox', () => {
    render(<GameMenu onStartGame={mockOnStartGame} />);
    
    const checkbox = screen.getByLabelText(/enable explanations/i);
    expect(checkbox).toBeChecked();
    
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('should call onStartGame with correct parameters when form is submitted', () => {
    render(<GameMenu onStartGame={mockOnStartGame} />);
    
    const nameInput = screen.getByDisplayValue('GUEST');
    const checkbox = screen.getByLabelText(/enable explanations/i);
    const startButton = screen.getByRole('button', { name: /start game/i });
    
    fireEvent.change(nameInput, { target: { value: 'TestPlayer' } });
    fireEvent.click(checkbox); // Uncheck notifications
    fireEvent.click(startButton);
    
    expect(mockOnStartGame).toHaveBeenCalledWith('TestPlayer', false);
  });

  it('should handle empty player name by using default', () => {
    render(<GameMenu onStartGame={mockOnStartGame} />);
    
    const nameInput = screen.getByDisplayValue('GUEST');
    const startButton = screen.getByRole('button', { name: /start game/i });
    
    fireEvent.change(nameInput, { target: { value: '   ' } }); // Whitespace only
    fireEvent.click(startButton);
    
    expect(mockOnStartGame).toHaveBeenCalledWith('GUEST', true);
  });

  it('should handle form submission with Enter key', () => {
    render(<GameMenu onStartGame={mockOnStartGame} />);
    
    const form = screen.getByRole('button', { name: /start game/i }).closest('form');
    fireEvent.submit(form!);
    
    expect(mockOnStartGame).toHaveBeenCalledWith('GUEST', true);
  });

  it('should enforce maximum length on player name', () => {
    render(<GameMenu onStartGame={mockOnStartGame} />);
    
    const nameInput = screen.getByDisplayValue('GUEST');
    expect(nameInput).toHaveAttribute('maxLength', '20');
  });

  it('should display footer information', () => {
    render(<GameMenu onStartGame={mockOnStartGame} />);
    
    expect(screen.getByText(/created by deniss strods/i)).toBeInTheDocument();
    expect(screen.getByText(/denmantm@inbox.lv/i)).toBeInTheDocument();
    expect(screen.getByText(/converted to react 2024/i)).toBeInTheDocument();
  });
});