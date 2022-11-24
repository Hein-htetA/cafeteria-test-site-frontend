import React, { useEffect, useRef, useState } from "react";
import { useOrderContext } from "../../Context/OrderContext";
import "./CollapsibleContainer.css";

const CollapsibleContainer = ({ children }) => {
  const { setDetailContainerHeight, detailHide, onClickHideShow } =
    useOrderContext();

  const [forceRender, setForceRender] = useState(true);

  const collapseContainerRef = useRef(null);
  const heightRef = useRef(null);
  const firstRender = useRef(true);

  // console.log("heightRef.current", heightRef.current);

  useEffect(() => {
    console.log("collapse useEffect");
    // onClickHideShow(id, "detailHide");
    if (firstRender.current) {
      console.log("is first render", firstRender.current);
      heightRef.current = collapseContainerRef.current.offsetHeight;
      firstRender.current = false;
      setForceRender(false);
    }

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
        detailHide
          ? " detail-container detail-container-hidden"
          : "detail-container"
      }
      style={detailHide ? { height: "0px" } : { height: heightRef.current }}
    >
      {children}
      <div className="space-holder-transition">.</div>
    </div>
  );
};

export default CollapsibleContainer;
