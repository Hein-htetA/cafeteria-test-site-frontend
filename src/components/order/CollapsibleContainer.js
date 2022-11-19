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
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      onClickHideShow(id, "detailHide");
      isFirstRender.current = false;
    }
    heightRef.current = collapseContainerRef.current.offsetHeight;
    console.log("in useeffect");
    console.log("max", heightRef.current);
    console.log("conta", collapseContainerRef.current.offsetHeight);
    console.log("-------");
  }, [addressHide]);

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
