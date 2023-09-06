import React from 'react';
import './style.css'; // Подключаем CSS-файл для стилей кнопки

const RoundButton = () => {
  return (
    <button className="round-button">
      <div className="triangle-down"></div>
    </button>
  );
};

export default RoundButton;
