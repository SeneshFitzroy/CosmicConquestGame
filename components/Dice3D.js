import React, { useState, useEffect } from 'react';
import styles from './Dice3D.module.css';

const Dice3D = ({ onRoll, isRolling, value }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  
  // Calculate dice rotations for each face
  const getFaceRotation = (faceValue) => {
    switch(faceValue) {
      case 1: return { x: 0, y: 0, z: 0 };
      case 2: return { x: 0, y: -90, z: 0 };
      case 3: return { x: -90, y: 0, z: 0 };
      case 4: return { x: 90, y: 0, z: 0 };
      case 5: return { x: 0, y: 90, z: 0 };
      case 6: return { x: 180, y: 0, z: 0 };
      default: return { x: 0, y: 0, z: 0 };
    }
  };
  
  useEffect(() => {
    if (!isRolling && value) {
      const targetRotation = getFaceRotation(value);
      setRotation(targetRotation);
    }
    
    if (isRolling) {
      const rollInterval = setInterval(() => {
        setRotation({
          x: Math.floor(Math.random() * 360),
          y: Math.floor(Math.random() * 360),
          z: Math.floor(Math.random() * 360)
        });
      }, 100);
      
      return () => clearInterval(rollInterval);
    }
  }, [isRolling, value]);
  
  const handleClick = () => {
    if (!isRolling) {
      onRoll();
    }
  };
  
  return (
    <div className={styles.diceContainer}>
      <div 
        className={styles.diceShadow}
        style={{ 
          opacity: isRolling ? 0.4 : 0.7,
          transform: `scale(${isRolling ? 0.8 : 1})`
        }}
      ></div>
      
      <div
        className={`${styles.dice} ${isRolling ? styles.rolling : ''}`}
        onClick={handleClick}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
          transition: isRolling ? 'none' : 'transform 0.8s cubic-bezier(0.4, 2.0, 0.2, 1)'
        }}
      >
        <div className={`${styles.diceFace} ${styles.front}`}>
          <div className={styles.dot} style={{ gridArea: '2 / 2' }}></div>
        </div>
        <div className={`${styles.diceFace} ${styles.back}`}>
          <div className={styles.dot} style={{ gridArea: '1 / 1' }}></div>
          <div className={styles.dot} style={{ gridArea: '1 / 3' }}></div>
          <div className={styles.dot} style={{ gridArea: '2 / 2' }}></div>
          <div className={styles.dot} style={{ gridArea: '3 / 1' }}></div>
          <div className={styles.dot} style={{ gridArea: '3 / 3' }}></div>
          <div className={styles.dot} style={{ gridArea: '2 / 2' }}></div>
        </div>
        <div className={`${styles.diceFace} ${styles.right}`}>
          <div className={styles.dot} style={{ gridArea: '1 / 1' }}></div>
          <div className={styles.dot} style={{ gridArea: '1 / 3' }}></div>
          <div className={styles.dot} style={{ gridArea: '3 / 1' }}></div>
          <div className={styles.dot} style={{ gridArea: '3 / 3' }}></div>
        </div>
        <div className={`${styles.diceFace} ${styles.left}`}>
          <div className={styles.dot} style={{ gridArea: '1 / 1' }}></div>
          <div className={styles.dot} style={{ gridArea: '1 / 3' }}></div>
          <div className={styles.dot} style={{ gridArea: '3 / 1' }}></div>
          <div className={styles.dot} style={{ gridArea: '3 / 3' }}></div>
          <div className={styles.dot} style={{ gridArea: '2 / 2' }}></div>
        </div>
        <div className={`${styles.diceFace} ${styles.top}`}>
          <div className={styles.dot} style={{ gridArea: '1 / 1' }}></div>
          <div className={styles.dot} style={{ gridArea: '1 / 3' }}></div>
          <div className={styles.dot} style={{ gridArea: '3 / 3' }}></div>
        </div>
        <div className={`${styles.diceFace} ${styles.bottom}`}>
          <div className={styles.dot} style={{ gridArea: '1 / 1' }}></div>
          <div className={styles.dot} style={{ gridArea: '3 / 3' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Dice3D;
