import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideRestaurantRecentlyClosedModal } from "../../../../features/cartSlice";

export function useOnClickOutside(ref, handler) {
  const dispatch = useDispatch();
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        dispatch(hideRestaurantRecentlyClosedModal());
      };
      document.addEventListener("mousedown", listener);
      //document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        //document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}
