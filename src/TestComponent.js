import React from "react";
import { useTestContext } from "./Context/TestContext";

const TestComponent = () => {
  const { count, incCount } = useTestContext();
  return (
    <>
      <div>TestComponent</div>
      <div>{count}</div>
      <button onClick={incCount}>Increase Count</button>
    </>
  );
};

export default TestComponent;
