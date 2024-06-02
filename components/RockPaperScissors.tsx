import React, { useState } from "react";
import Header from "./Header";

const RockPaperScissors: React.FC = () => {
  const [gameState, setGameState] = useState<{ computerMove: string; choice: string }>({ computerMove: '', choice: '' });
  const [result, setResult] = useState<string | boolean>('');
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [animationTrigger, setAnimationTrigger] = useState(false);

  const randomNumberInRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleClick = (choice: string) => {
    let computerChoice = '';
    const randNum = randomNumberInRange(0, 2);

    if (randNum === 0) {
      computerChoice = 'ROCK';
    } else if (randNum === 1) {
      computerChoice = 'PAPER';
    } else if (randNum === 2) {
      computerChoice = 'SCISSORS';
    }

    const allState = { computerMove: computerChoice, choice };
    setGameState(allState);

    checkResult(allState);
    setAnimationTrigger(false); 
    setTimeout(() => setAnimationTrigger(true), 0);
  };

  const checkResult = (allState: { computerMove: string; choice: string }) => {
    if (allState.choice === allState.computerMove) {
      setResult('Draw');
      setUserScore(userScore + 1);
      setComputerScore(computerScore + 1);
    } else if (
      (allState.choice === 'ROCK' && allState.computerMove === 'SCISSORS') ||
      (allState.choice === 'PAPER' && allState.computerMove === 'ROCK') ||
      (allState.choice === 'SCISSORS' && allState.computerMove === 'PAPER')
    ) {
      setResult('You win');
      setUserScore(userScore + 1);
    } else {
      setResult('You lose');
      setComputerScore(computerScore + 1);
    }
  };

  return (
    <div className="main">
      <Header />

      <div className="score_points">
        <p>{userScore} - {computerScore}</p>
      </div>

      <div className="show_result">
        <p>{result}</p>
      </div>

      <div className="all_choice_btns">
        <button onClick={() => handleClick('ROCK')} className="choice_btn">ROCK</button>
        <button onClick={() => handleClick('PAPER')} className="choice_btn">PAPER</button>
        <div className="scissors_btn">
          <button onClick={() => handleClick('SCISSORS')} className="choice_btn">SCISSORS</button>
        </div>
      </div>

      <div className="picked_moves">
        <p className={`computer_move ${animationTrigger ? 'fadeIn' : ''}`}>{gameState.computerMove}</p>
        <p className={`user_move ${animationTrigger ? 'fadeIn' : ''}`}>{gameState.choice}</p>
      </div>

      <div className="reset_btn_div">
        <button
          onClick={() => {
            setGameState({ computerMove: '', choice: '' });
            setUserScore(0);
            setComputerScore(0);
            setResult('');
            setAnimationTrigger(false);
          }} className="reset_btn">
          Reset
        </button>
      </div>
    </div>
  );
};

export default RockPaperScissors;
