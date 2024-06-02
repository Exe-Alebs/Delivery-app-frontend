import React, { createContext, useContext, useState, useEffect } from "react";

const MealContext = createContext();

export const useMealContext = () => useContext(MealContext);

export const MealProvider = ({ children }) => {
  const [orderList, setOrderList] = useState(() => {
    const savedOrderList = localStorage.getItem("orderList");
    return savedOrderList ? JSON.parse(savedOrderList) : [];
  });

  useEffect(() => {
    localStorage.setItem("orderList", JSON.stringify(orderList));
  }, [orderList]);

  const addToOrderList = (meal) => {
    setOrderList((prevOrderList) => [...prevOrderList, meal]);
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
