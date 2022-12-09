import React from "react";
import { useUiContext } from "../../../Context/UiContext";

const MenuError = () => {
  const { setMenuState } = useUiContext();
  const controller = new AbortController();

  // useEffect(() => {
  //   return () => controller.abort();
  // }, []);

  return (
    <div className="empty-box">
      <button onClick={() => setMenuState(controller)}>Try Again ?</button>
    </div>
  );
};

export default MenuError;
