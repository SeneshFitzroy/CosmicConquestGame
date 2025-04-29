import React, { useState } from 'react';
import styles from './GameCard.module.css';

const GameCard = ({ type, title, description, onClose, color }) => {
  const [animationEnd, setAnimationEnd] = useState(false);
  
  const handleAnimationEnd = () => {
    setAnimationEnd(true);
  };
  
  return (
    <div className={styles.cardContainer}>
      <div 
        className={`${styles.card} ${animationEnd ? styles.cardHover : ''}`}
        style={{ backgroundColor: color || (type === 'obstacle' ? '#f76565' : '#f7d365') }}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className={styles.cardInner}>
          <div className={styles.cardHeader}>
            <h3>{title}</h3>
            <div className={styles.cardType}>{type}</div>
          </div>
          
          <div className={styles.cardBody}>
            <p>{description}</p>
          </div>
          
          <div className={styles.cardFooter}>
            <button className={styles.cardButton} onClick={onClose}>
              Apply Effect
            </button>
          </div>
        </div>
        
        <div className={styles.cardShine}></div>
        <div className={styles.cardShadow}></div>
      </div>
    </div>
  );
};

export default GameCard;
