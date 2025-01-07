import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  // Translations (only keeping the essential words)
  const translations = [
    { english: "Hello", spanish: "Hola" },
    { english: "Goodbye", spanish: "Adiós" },
    { english: "Please", spanish: "Por favor" },
    { english: "Thank you", spanish: "Gracias" },
    { english: "Yes", spanish: "Sí" },
    { english: "No", spanish: "No" },
    { english: "Dog", spanish: "Perro" },
    { english: "Cat", spanish: "Gato" },
    { english: "Love", spanish: "Amor" },
    { english: "Bro", spanish: "Mano" },

  ];

  // Adjust difficulty based on level
  const getLevelCards = (level) => {
    const difficultyMap = {
      0: 4, // Easy: 4 pairs
      1: 6, // Medium: 6 pairs
      2: 8, // Hard: 8 pairs
      3: 10, // Very Hard: 10 pairs
    };

    const numPairs = difficultyMap[level] || 4; // Default to Easy if undefined
    const shuffledPairs = translations.slice(0, numPairs);
    const allCards = [];

    shuffledPairs.forEach(pair => {
      allCards.push({ text: pair.english, language: "english", flipped: false });
      allCards.push({ text: pair.spanish, language: "spanish", flipped: false });
    });

    // Shuffle cards
    for (let i = allCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
    }

    return allCards;
  };

  // States for memory game
  const [level, setLevel] = useState(0); // Track the current level
  const [cards, setCards] = useState(getLevelCards(level)); // Create cards based on level
  const [selectedCards, setSelectedCards] = useState([]); // Track selected cards
  const [gameFinished, setGameFinished] = useState(false); // Track if the game is finished
  const [score, setScore] = useState(0); // Track score
  const [timer, setTimer] = useState(0); // Track time in seconds
  const [gameTimer, setGameTimer] = useState(null); // Timer interval for countdown
  const [winMessage, setWinMessage] = useState(false); // Track win message visibility

  // Handle card click
  const handleCardClick = (index) => {
    if (selectedCards.length === 2 || cards[index].flipped) return;

    const newSelectedCards = [...selectedCards, index];
    const newCards = cards.map((card, i) =>
      i === index ? { ...card, flipped: true } : card
    );

    setCards(newCards);
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      const [firstIndex, secondIndex] = newSelectedCards;
      const firstCard = newCards[firstIndex];
      const secondCard = newCards[secondIndex];

      if (
        (firstCard.language === "english" && secondCard.language === "spanish" &&
          translations.some(
            (pair) =>
              pair.english === firstCard.text && pair.spanish === secondCard.text
          )) ||
        (firstCard.language === "spanish" && secondCard.language === "english" &&
          translations.some(
            (pair) =>
              pair.english === secondCard.text && pair.spanish === firstCard.text
          ))
      ) {
        // It's a match! Reset selected cards and update score
        setScore(prevScore => prevScore + 50); // Multiply the score by 50 on a match
        setSelectedCards([]);
      } else {
        // Not a match, flip back after a delay
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, i) =>
              i === firstIndex || i === secondIndex
                ? { ...card, flipped: false }
                : card
            )
          );
          setSelectedCards([]);
        }, 1000); // 1 second delay
      }
    }

    // Check if the game is finished (all cards are flipped)
    if (newCards.every(card => card.flipped)) {
      if (level === 3) {
        setWinMessage(true); // Show win message when level 4 is completed
      } else {
        setGameFinished(true);
      }
    }
  };

  // Start timer when the game starts
  useEffect(() => {
    if (gameFinished || winMessage) return; // Don't start timer if the game is finished or won

    const timerInterval = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);

    setGameTimer(timerInterval);

    // Clean up the timer interval on unmount
    return () => clearInterval(timerInterval);
  }, [gameFinished, winMessage]);

  // Function to handle level up after game is finished
  const levelUp = () => {
    if (!gameFinished || level >= 3) return; // Ensure all cards are matched and level is <= 3
    
    setLevel(prevLevel => {
      const newLevel = prevLevel + 1;
      setCards(getLevelCards(newLevel)); // Set new cards based on level
      setGameFinished(false); // Reset the game state
      setTimer(0); // Reset the timer
      return newLevel;
    });
  };

  // Format timer as MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Function to restart the game
  const restartGame = () => {
    setLevel(0);
    setScore(0);
    setTimer(0);
    setCards(getLevelCards(0));
    setGameFinished(false);
    setWinMessage(false);
  };

  return (
    <main>
      <h1>Memory Card Game</h1>
      <div className="game-stats">
        <p>Level: {level + 1}</p>
        <p>Score: {score}</p>
        <p>Time: {formatTime(timer)}</p>
      </div>
      <div className="grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${card.flipped ? "flipped" : ""}`}
            onClick={() => handleCardClick(index)}
          >
            {card.flipped ? card.text : "❓"}
          </div>
        ))}
      </div>

      {gameFinished && level < 3 && (
        <div>
          <button onClick={levelUp}>Level Up</button>
        </div>
      )}

      {winMessage && (
        <div className="result-box">
          <h2>Congratulations!</h2>
          <p>You completed the game!</p>
          <p>Final Score: {score}</p>
          <p>Time Taken: {formatTime(timer)}</p>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      )}
    </main>
  );
};

export default App;
