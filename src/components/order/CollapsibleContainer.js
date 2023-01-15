import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import "./CollapsibleContainer.css";
import { setDetailContainerHeight } from "../../features/orderSlice";

const CollapsibleContainer = ({
  id,
  children,
  detailContainerHeight,
  detailHide,
}) => {
  const collapseContainerRef = useRef(null);
  const firstRender = useRef(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (firstRender.current) {
      dispatch(
        setDetailContainerHeight({
          id,
          detailContainerHeight: collapseContainerRef.current.offsetHeight,
        })
      );
      firstRender.current = false;
    }

    const reload = function (event) {
      document.location.reload(false);
    };

    window.screen.orientation.addEventListener("change", reload);

    return () =>
      window.screen.orientation.removeEventListener("change", reload);
  }, []);

  return (
    <div
      ref={collapseContainerRef}
      className={
        detailHide
          ? "collapse-container collapse-container-hidden"
          : "collapse-container"
      }
      style={{
        height:
          firstRender.current && detailContainerHeight === 0
            ? "auto"
            : detailHide
            ? 0
            : detailContainerHeight,
      }}
    >
      {children}
      <div className="space-holder-transition">.</div>
    </div>
  );
};

export default CollapsibleContainer;
