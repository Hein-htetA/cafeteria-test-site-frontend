import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { localBaseUrl } from "../components/utils/baseUrl";

const initializeFun = () => {
  const publicRestaurants =
    sessionStorage.getItem("publicRestaurants") !== null
      ? JSON.parse(sessionStorage.getItem("publicRestaurants"))
      : [];
  const searchResult = [];
  const searchStatus = "idle";
  const restaurantStatus = "idle" || "loading" || "succeeded" || "failed";
  const menuStatus = "idle";
  const profileStatus = "idle";
  const endOfResult = false;

  const page = Math.ceil(publicRestaurants.length / 3) || 1;

  return {
    publicRestaurants,
    searchStatus,
    restaurantStatus,
    menuStatus,
    profileStatus,
    page,
    endOfResult,
    searchResult,
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
      return restaurants;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const fetchRestaurantsByName = createAsyncThunk(
  "publicData/fetchRestaurantsByName",
  async (name, { rejectWithValue }) => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const response = await fetch(
        `${localBaseUrl}/restaurants/search?name=${name}`,
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

const fetchUserByRestaurantId = createAsyncThunk(
  "publicData/fetchUserByRestaurantId",
  async (restaurantId, { rejectWithValue }) => {
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      const response = await fetch(
        `${localBaseUrl}/users/${restaurantId}`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error();
      }
      const { user } = await response.json();
      return user;
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
      .addCase(fetchRestaurantsByPage.pending, (state) => {
        state.restaurantStatus = "loading";
      })
      .addCase(fetchRestaurantsByPage.fulfilled, (state, action) => {
        state.restaurantStatus = "succeeded";
        const oldPublicRestaurants = state.publicRestaurants.slice(
          0,
          (action.meta.arg - 1) * 3
        );
        const restaurantsToBeReplaced = state.publicRestaurants.slice(
          (action.meta.arg - 1) * 3
        );
        const newRestaurants = action.payload;

        const newRestaurantWithMenuAndOwnerInfo = newRestaurants.map(
          (restaurant) => {
            const index = restaurantsToBeReplaced.findIndex(
              (rest) => rest._id === restaurant._id
            );
            //console.log("index", current(index));
            if (index !== -1) {
              restaurant.menu = restaurantsToBeReplaced[index].menu;
              restaurant.ownerInfo = restaurantsToBeReplaced[index].ownerInfo;
            }
            return restaurant;
          }
        );
        state.publicRestaurants = oldPublicRestaurants.concat(
          newRestaurantWithMenuAndOwnerInfo
        );

        // state.publicRestaurants = state.publicRestaurants
        //   .slice(0, (action.meta.arg - 1) * 3) //previous page hti u ml //to prevent page a sone htwet restaurants
        //   .concat(action.payload);

        if (action.payload.length < 3) {
          state.endOfResult = true;
        }
      })
      .addCase(fetchRestaurantsByPage.rejected, (state) => {
        state.restaurantStatus = "failed";
      })

      .addCase(fetchRestaurantsByName.pending, (state) => {
        state.searchStatus = "loading";
      })
      .addCase(fetchRestaurantsByName.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.searchResult = action.payload;
      })
      .addCase(fetchRestaurantsByName.rejected, (state) => {
        state.searchStatus = "failed";
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
      })
      .addCase(fetchUserByRestaurantId.pending, (state) => {
        state.profileStatus = "loading";
      })
      .addCase(fetchUserByRestaurantId.fulfilled, (state, action) => {
        state.profileStatus = "succeeded";
        const index = state.publicRestaurants.findIndex((restaurant) => {
          return restaurant._id === action.meta.arg;
        });
        state.publicRestaurants[index].ownerInfo = action.payload;
      })
      .addCase(fetchUserByRestaurantId.rejected, (state) => {
        state.profileStatus = "failed";
      });
  },
});

export {
  fetchRestaurantsByPage,
  fetchMenuByRestaurantId,
  fetchUserByRestaurantId,
  fetchRestaurantsByName,
};

export const { increasePage } = publicDataSlice.actions;

export default publicDataSlice.reducer;
