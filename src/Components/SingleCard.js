import React from 'react';
import './SingleCard.css';

function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img
          className="front"
          src={process.env.PUBLIC_URL + card.src}
          alt="card front"
        />
        <img
          className="back"
          src={process.env.PUBLIC_URL + './img/cover.png'}
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default SingleCard;
