import { createContext, useState } from 'react';

export const BurgerContext = createContext();

export const BurgerProvider = ({ children }) => {
  const [burgerVisibility, setBurgerVisibility] = useState(false);
  const toggleVisibility = () => {
    setBurgerVisibility(!burgerVisibility);
  };

  return (
    <BurgerContext.Provider value={{ burgerVisibility, toggleVisibility }}>
      {children}
    </BurgerContext.Provider>
  );
};
