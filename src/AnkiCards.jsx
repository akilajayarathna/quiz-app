import { useState, useEffect } from "react";
import cardsData from "./data/ankiQuestions.json";

function shuffleArray(array) {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function AnkiCards({ onExit }) {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setCards(shuffleArray(cardsData));
  }, []);

  if (cards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  const card = cards[currentIndex];

  const goNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((i) => i + 1);
      setIsFlipped(false);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setIsFlipped(false);
    }
  };

  const reshuffle = () => {
    setCards(shuffleArray(cardsData));
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-6 py-12">

      <p className="mb-6 text-lg font-semibold text-gray-600">
        Card {currentIndex + 1} / {cards.length}
      </p>

      {/* Flash Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="
          w-full
          max-w-5xl
          h-[420px]
          bg-white
          rounded-3xl
          border-2
          border-green-300
          shadow-2xl
          cursor-pointer
          flex
          items-center
          justify-center
          p-12
          transition-all
          duration-300
          hover:scale-[1.01]
        "
      >
        <h2 className="text-2xl md:text-4xl font-bold text-center leading-relaxed text-gray-800 whitespace-pre-wrap break-words">
          {isFlipped ? card.answer : card.question}
        </h2>
      </div>

      <p className="mt-6 text-gray-500 text-lg">
        Click the card to flip
      </p>

      <div className="flex flex-wrap justify-center gap-5 mt-8">

        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="
            bg-gray-200
            hover:bg-gray-300
            disabled:bg-gray-100
            disabled:text-gray-400
            disabled:cursor-not-allowed
            px-8
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          ← Previous
        </button>

        <button
          onClick={goNext}
          disabled={currentIndex === cards.length - 1}
          className="
            bg-green-500
            hover:bg-green-600
            disabled:bg-green-200
            disabled:cursor-not-allowed
            text-white
            px-8
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          Next →
        </button>

        <button
          onClick={reshuffle}
          className="
            bg-yellow-400
            hover:bg-yellow-500
            px-8
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          🔀 Reshuffle
        </button>

      </div>

      <button
        onClick={onExit}
        className="mt-8 text-green-700 hover:underline font-medium text-lg"
      >
        ← Back to Menu
      </button>

    </div>
  );
}

export default AnkiCards;