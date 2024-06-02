// MealContext.js
import React, { createContext, useContext, useState } from "react";

const MealContext = createContext();

export const useMealContext = () => useContext(MealContext);

export const MealProvider = ({ children }) => {
  const [orderList, setOrderList] = useState([]);

  const addToOrderList = (meal) => {
    setOrderList([...orderList, meal]);
  };

  return (
    <MealContext.Provider
      value={{
        orderList,
        addToOrderList,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};
