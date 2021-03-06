import './App.css';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SingleCard from './Components/SingleCard';

const cardImages = [
  { src: './img/helmet-1.png', matched: false },
  { src: './img/potion-1.png', matched: false },
  { src: './img/ring-1.png', matched: false },
  { src: './img/scroll-1.png', matched: false },
  { src: './img/shield-1.png', matched: false },
  { src: './img/sword-1.png', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: uuidv4() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    console.log(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1100);
      }
    }
  }, [choiceOne, choiceTwo]);

  //reset turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="bg">
      <div className="App">
        <h1>Magic Match</h1>
        <button onClick={shuffleCards}>New Game</button>
        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disbled={disabled}
            />
          ))}
        </div>
        <p>Turns: {turns}</p>
      </div>
    </div>
  );
}

export default App;
