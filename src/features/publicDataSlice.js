import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { localBaseUrl } from "../components/utils/baseUrl";

const initializeFun = () => {
  const publicRestaurants =
    sessionStorage.getItem("publicRestaurants") !== null
      ? JSON.parse(sessionStorage.getItem("publicRestaurants"))
      : [];
  const restaurantStatus = "idle" || "loading" || "succeeded" || "failed";
  const menuStatus = "idle";
  const endOfResult = false;

  const page = Math.ceil(publicRestaurants.length / 3) || 1;

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
  async (page, { rejectWithValue, getState }) => {
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
      const pubResInStore = getState().publicData.publicRestaurants.slice(
        0,
        (page - 1) * 3
      );
      sessionStorage.setItem(
        "publicRestaurants",
        JSON.stringify(pubResInStore.concat(restaurants))
      );
      return restaurants;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const fetchMenuByRestaurantId = createAsyncThunk(
  "publicData/fetchMenuByRestaurantId",
  async (restaurantId, { rejectWithValue, getState }) => {
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
          .slice(0, (action.meta.arg - 1) * 3) //previous page hti u ml //to prevent page a sone htwet restaurants
          .concat(action.payload);

        if (action.payload.length < 3) {
          state.endOfResult = true;
        }
      })
      .addCase(fetchRestaurantsByPage.rejected, (state) => {
        state.restaurantStatus = "failed";
      })

      .addCase(fetchMenuByRestaurantId.pending, (state) => {
        state.menuStatus = "loading";
      })
      .addCase(fetchMenuByRestaurantId.fulfilled, (state, action) => {
        state.menuStatus = "succeeded";
        const index = state.publicRestaurants.findIndex((restaurant) => {
          return restaurant._id === action.meta.arg;
        });
        state.publicRestaurants[index].menu = action.payload;
      })
      .addCase(fetchMenuByRestaurantId.rejected, (state) => {
        state.menuStatus = "failed";
      });
  },
});

export { fetchRestaurantsByPage, fetchMenuByRestaurantId };

export const { increasePage } = publicDataSlice.actions;

export default publicDataSlice.reducer;
