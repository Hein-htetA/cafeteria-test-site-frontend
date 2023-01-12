import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { localBaseUrl } from "../components/utils/baseUrl";

const initializeFun = () => {
  const publicRestaurants =
    localStorage.getItem("publicRestaurants") !== null
      ? JSON.parse(localStorage.getItem("publicRestaurants"))
      : [];
  const restaurantStatus = "idle" || "loading" || "succeeded" || "failed";
  const menuStatus = "idle";
  const endOfResult = false;

  const page = Math.ceil(publicRestaurants.length / 3) + 1;

  return {
    publicRestaurants,
    restaurantStatus,
    menuStatus,
    page,
    endOfResult,
  };
};

const fetchRestaurantsByPage = createAsyncThunk(
  "publicData/fetchRestaurantsByPage",
  async (page, { rejectWithValue }) => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const response = await fetch(
        `${localBaseUrl}/restaurants?page=${page}`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error();
      }
      const { restaurants } = await response.json();
      return restaurants;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const publicDataSlice = createSlice({
  name: "publicData",
  initialState: initializeFun,
  reducers: {
    increasePage: (state) => {
      state.page = state.page + 1;
    },
  },
  extraReducers(builder) {
    builder
      //register restaurant
      .addCase(fetchRestaurantsByPage.pending, (state) => {
        state.restaurantStatus = "loading";
      })
      .addCase(fetchRestaurantsByPage.fulfilled, (state, action) => {
        state.restaurantStatus = "succeeded";
        state.publicRestaurants = state.publicRestaurants
          .slice(0, (action.meta.arg - 1) * 3) //to prevent page a sone htwet restaurants
          .concat(action.payload);
        if (action.payload.length === 0) {
          state.endOfResult = true;
        }
      })
      .addCase(fetchRestaurantsByPage.rejected, (state) => {
        state.restaurantStatus = "failed";
      });
  },
});

export { fetchRestaurantsByPage };

export const { increasePage } = publicDataSlice.actions;

export default publicDataSlice.reducer;
