import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { localBaseUrl } from "../components/utils/baseUrl";

const initialState = {
  restaurantStatus: "idle" || "loading" || "succeeded" || "failed",
  menuStatus: "idle" || "loading" || "succeeded" || "failed",
};

const fetchRestaurant = createAsyncThunk(
  "restaurant/fetchRestaurant",
  async (restaurantId, { rejectWithValue }) => {
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const response = await fetch(
        `${localBaseUrl}/restaurants/${restaurantId}`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error();
      }
      const { restaurant } = await response.json();
      return restaurant;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const fetchMenu = createAsyncThunk(
  "restaurant/fetchMenu",
  async (restaurantId, { rejectWithValue }) => {
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const response = await fetch(
        `${localBaseUrl}/menu/${restaurantId}`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error();
      }
      const { data } = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRestaurant.pending, (state, action) => {
        state.restaurantStatus = "loading";
      })
      .addCase(fetchRestaurant.fulfilled, (state, action) => {
        state.restaurantStatus = "succeeded";
        state.restaurantData = action.payload;
      })
      .addCase(fetchRestaurant.rejected, (state, action) => {
        state.restaurantStatus = "failed";
      })
      //fetch menu
      .addCase(fetchMenu.pending, (state, action) => {
        state.menuStatus = "loading";
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.menuStatus = "succeeded";
        state.menuData = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.menuStatus = "failed";
      });
  },
});

export { fetchRestaurant, fetchMenu };

export default restaurantSlice.reducer;
