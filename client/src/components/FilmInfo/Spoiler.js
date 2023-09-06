import React, { useState } from 'react';
import './style.css';
const Spoiler = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSpoiler = () => {
    setIsExpanded(!isExpanded);
  };

      
   
  return (
    <div>
      <button onClick={toggleSpoiler} className="round-button">
      
        {isExpanded ? <div className="triangle-down"></div> : <div className="triangle-up"></div>}
        {' '}
        
      </button>
      Где смотреть
      {isExpanded && <div>{children}</div>}
    </div>
  );
};

export default Spoiler;