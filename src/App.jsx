import { useState } from "react";
import "./App.css";

const App = () => {
  // MASH game categories
  const mashCategories = {
    domiciles: ["Mansion", "Apartment", "Shack", "House"],
    partners: ["John", "Mary", "Tom", "Sarah", "Alex"],
    children: [0, 1, 2, 3, 4],
    cars: ["Tesla", "BMW", "Ford", "Honda"],
  };

  // Memory game translations
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
    { english: "Bro", spanish: "Mano"},
  ];

  // 1. Generate and shuffle cards
  const createShuffledCards = () => {
    const allCards = [];
    for (const pair of translations) {
      allCards.push({ text: pair.english, language: "english", flipped: false });
      allCards.push({ text: pair.spanish, language: "spanish", flipped: false });
    }
    for (let i = allCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
    }
    return allCards;
  };

  // States for memory game
  const [cards, setCards] = useState(createShuffledCards());
  const [selectedCards, setSelectedCards] = useState([]); // Track selected cards
  const [mashResult, setMashResult] = useState(null); // To store the MASH result
  const [gameFinished, setGameFinished] = useState(false); // Track if the game is finished

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
        // It's a match! Reset selected cards
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
      setGameFinished(true);
    }
  };

  // Function to calculate the MASH result
  const getMashResult = () => {
    if (!gameFinished) return;

    // Randomly select an option from each category
    const randomPick = (category) => {
      return mashCategories[category][Math.floor(Math.random() * mashCategories[category].length)];
    };

    const result = {
      domicile: randomPick("domiciles"),
      partner: randomPick("partners"),
      children: randomPick("children"),
      car: randomPick("cars"),
    };

    setMashResult(result);
  };

  return (
    <main>
      <h1>Memory Card Game</h1> {/* Updated title */}
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

      {gameFinished && !mashResult && (
        <div>
          <button onClick={getMashResult}>Get Your MASH Fortune</button>
        </div>
      )}

      {mashResult && (
        <div className="mash-result">
          <h2>Your MASH Fortune:</h2>
          <p>Domicile: {mashResult.domicile}</p>
          <p>Partner: {mashResult.partner}</p>
          <p>Children: {mashResult.children}</p>
          <p>Car: {mashResult.car}</p>
        </div>
      )}
    </main>
  );
};

export default App;
