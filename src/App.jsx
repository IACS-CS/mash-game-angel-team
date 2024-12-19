import { useState } from "react";
import "./App.css";

const App = () => {
  const translations = [
    { english: "Hello", spanish: "Hola" },
    { english: "Goodbye", spanish: "Adiós" },
    { english: "Please", spanish: "Por favor" },
    { english: "Thank you", spanish: "Gracias" },
    { english: "Yes", spanish: "Sí" },
    { english: "No", spanish: "No" },
    { english: "Dog", spanish: "Perro" },
    { english: "Cat", spanish: "Gato" },
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

  // States
  const [cards, setCards] = useState(createShuffledCards());
  const [selectedCards, setSelectedCards] = useState([]); // Track selected cards

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
  };

  return (
    <main>
      <h1>Memory Game</h1>
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
    </main>
  );
};

export default App;
