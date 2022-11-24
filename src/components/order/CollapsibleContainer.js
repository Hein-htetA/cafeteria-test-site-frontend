import React, { useEffect, useRef } from "react";
import "./CollapsibleContainer.css";

const CollapsibleContainer = ({
  children,
  hide,
  addressHide,
  id,
  onClickHideShow,
}) => {
  const collapseContainerRef = useRef(null);
  const heightRef = useRef(null);

  useEffect(() => {
    console.log("collapse useEffect");
    // onClickHideShow(id, "detailHide");
    heightRef.current = collapseContainerRef.current.offsetHeight;
    const reload = function (event) {
      console.log("re load run");
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
        hide ? " detail-container detail-container-hidden" : "detail-container"
      }
      style={hide ? { height: "0px" } : { height: heightRef.current }}
    >
      {children}
      <div className="space-holder-transition">.</div>
    </div>
  );
};

export default CollapsibleContainer;
