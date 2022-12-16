import React, { createContext, useContext } from "react";
import { useState } from "react";

const TestContext = createContext();

const TestContextProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const incCount = () => {
    setCount((count) => count + 1);
  };
  return (
    <TestContext.Provider value={{ count, incCount }}>
      {children}
    </TestContext.Provider>
  );
};

const useTestContext = () => {
  return useContext(TestContext);
};

export { useTestContext, TestContextProvider };
