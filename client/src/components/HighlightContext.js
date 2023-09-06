import React, { createContext, useState } from 'react';

export const HighlightContext = createContext();

const HighlightProvider = ({ children }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const toggleHighlight = () => {
    setIsHighlighted(!isHighlighted);
  };

  return (
    <HighlightContext.Provider value={{ isHighlighted, toggleHighlight }}>
      {children}
    </HighlightContext.Provider>
  );
};

export default HighlightProvider;