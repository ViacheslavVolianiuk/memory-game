import React from 'react';
import './SingleCard.css';

function SingleCard({ card, handleChoice }) {
  const handleClick = (e) => {
    handleChoice(e.target.previousSibling.src);
  };

  return (
    <div className="card">
      <div>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/img/cover.png"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default SingleCard;
