import { useMenuContext } from "../../Context/MenuContext";

function useMenuContextData() {
  const { data, menuLoading, menuError, setRestaurantState } = useMenuContext();
  return { data, menuLoading, menuError, setRestaurantState };
}

export default useMenuContextData;
