import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  // MASH game categories (you can expand this if needed)
  const mashCategories = {
    domiciles: ["Mansion", "Apartment", "Shack", "House"],
    partners: ["John", "Mary", "Tom", "Sarah", "Alex"],
    children: [0, 1, 2, 3, 4],
    cars: ["Tesla", "BMW", "Ford", "Honda"],
  };

  // Translations (you already have a list of words)
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
    { english: "Family", spanish: "Familia" },
    { english: "Friend", spanish: "Amigo" },
    { english: "Work", spanish: "Trabajo" },
    { english: "School", spanish: "Escuela" },
    { english: "Water", spanish: "Agua" },
    { english: "Food", spanish: "Comida" },
    { english: "House", spanish: "Casa" },
    { english: "Car", spanish: "Coche" },
    { english: "Game", spanish: "Juego" },
    { english: "Night", spanish: "Noche" },
    { english: "Morning", spanish: "Mañana" },
    { english: "Friendship", spanish: "Amistad" },
    { english: "Holiday", spanish: "Vacaciones" },
    { english: "City", spanish: "Ciudad" },
    { english: "Ocean", spanish: "Océano" },
    { english: "Mountain", spanish: "Montaña" },
    { english: "Rain", spanish: "Lluvia" },
    { english: "Sun", spanish: "Sol" },
    { english: "Moon", spanish: "Luna" },
    { english: "Star", spanish: "Estrella" },
    { english: "Flower", spanish: "Flor" },
    { english: "Tree", spanish: "Árbol" },
    { english: "Bird", spanish: "Pájaro" },
    { english: "Fish", spanish: "Pescado" },
    { english: "Fruit", spanish: "Fruta" },
    { english: "Vegetable", spanish: "Verdura" },
    { english: "Music", spanish: "Música" },
    { english: "Dance", spanish: "Bailar" },
    { english: "Movie", spanish: "Película" },
    { english: "Book", spanish: "Libro" },
    { english: "Computer", spanish: "Computadora" },
    { english: "Phone", spanish: "Teléfono" },
    { english: "Camera", spanish: "Cámara" },
    { english: "Painting", spanish: "Pintura" },
    { english: "Travel", spanish: "Viajar" },
    { english: "Adventure", spanish: "Aventura" },
    { english: "Learning", spanish: "Aprendizaje" },
    
    // Additional words
    { english: "Happy", spanish: "Feliz" },
    { english: "Sad", spanish: "Triste" },
    { english: "Beautiful", spanish: "Hermoso" },
    { english: "Strong", spanish: "Fuerte" },
    { english: "Smart", spanish: "Inteligente" },
    { english: "Fast", spanish: "Rápido" },
    { english: "Slow", spanish: "Lento" },
    { english: "Big", spanish: "Grande" },
    { english: "Small", spanish: "Pequeño" },
    { english: "Hot", spanish: "Caliente" },
    { english: "Cold", spanish: "Frío" },
    { english: "Light", spanish: "Luz" },
    { english: "Dark", spanish: "Oscuro" },
    { english: "Morning", spanish: "Mañana" },
    { english: "Evening", spanish: "Tarde" },
  
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
  const [timer, setTimer] = useState(0); // Track time
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
        setScore(prevScore => prevScore + 1);
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
        setTimeout(() => resetGame(), 3000); // Restart after 3 seconds
      } else {
        setGameFinished(true);
      }
    }
  };

  // Start timer when the game starts
  useEffect(() => {
    if (gameFinished) return; // Don't start timer if the game is finished

    const timerInterval = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);

    setGameTimer(timerInterval);

    // Clean up the timer interval on unmount
    return () => clearInterval(timerInterval);
  }, [gameFinished]);

  // Reset the game (including level and score)
  const resetGame = () => {
    setLevel(0);
    setScore(0);
    setCards(getLevelCards(0));
    setGameFinished(false);
    setTimer(0);
    setWinMessage(false); // Reset win message
    clearInterval(gameTimer);
  };

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

  return (
    <main>
      <h1>Memory Card Game</h1>
      <div className="game-stats">
        <p>Level: {level + 1}</p>
        <p>Score: {score}</p>
        <p>Time: {timer} seconds</p>
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

      {winMessage && <div className="win-message">You Win!</div>}

      <button onClick={resetGame}>Restart Game</button>
    </main>
  );
};

export default App;
