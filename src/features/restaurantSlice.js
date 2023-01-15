import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { localBaseUrl } from "../components/utils/baseUrl";
import { updateUserRestaurantId } from "./userSlice";

const initialState = {
  restaurantData: sessionStorage.getItem("restaurant")
    ? JSON.parse(sessionStorage.getItem("restaurant"))
    : {},
  menuData: sessionStorage.getItem("menu")
    ? JSON.parse(sessionStorage.getItem("menu"))
    : [],
  restaurantStatus: "idle", // "loading" || "succeeded" || "failed",
  updateRestaurantStatus: "idle",
  registerRestaurantStatus: "idle",
  menuStatus: "idle",
  addNewMenuStatus: "idle",
  updateMenuStatus: "idle",
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
      //sessionStorage.setItem("restaurant", JSON.stringify(restaurant));
      return restaurant;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const registerRestaurant = createAsyncThunk(
  "restaurant/registerRestaurant",
  async (formValues, { rejectWithValue, getState, dispatch }) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...formValues,
        firstPhone:
          formValues.firstPhone[0] === "0"
            ? formValues.firstPhone.slice(1)
            : formValues.firstPhone.slice(0),
        secondPhone:
          formValues.secondPhone[0] === "0"
            ? formValues.secondPhone.slice(1)
            : formValues.secondPhone.slice(0),
        ownerId: getState().user.userData._id,
      }),
    };
    try {
      const response = await fetch(
        `${localBaseUrl}/restaurants`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error();
      }
      const { restaurant } = await response.json();

      const user = JSON.parse(localStorage.getItem("user"));
      user.restaurantId = restaurant._id;
      localStorage.setItem("user", JSON.stringify(user));

      sessionStorage.setItem("restaurant", JSON.stringify(restaurant));
      dispatch(updateUserRestaurantId(restaurant._id));
      return restaurant;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const updateRestaurant = createAsyncThunk(
  "restaurant/updateRestaurant",
  async (formValues, { rejectWithValue, getState, dispatch }) => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...formValues,
        firstPhone:
          formValues.firstPhone[0] === "0"
            ? formValues.firstPhone.slice(1)
            : formValues.firstPhone.slice(0),
        secondPhone:
          formValues.secondPhone[0] === "0"
            ? formValues.secondPhone.slice(1)
            : formValues.secondPhone.slice(0),
        ownerId: getState().user.userData._id,
      }),
    };
    try {
      const response = await fetch(
        `${localBaseUrl}/restaurants`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error();
      }
      const { updatedRestaurant } = await response.json();

      sessionStorage.setItem("restaurant", JSON.stringify(updatedRestaurant));

      return updatedRestaurant;
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
      //sessionStorage.setItem("menu", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

const addNewMenu = createAsyncThunk(
  "restaurant/addNewMenu",
  async (menuCategoryNFormValues, { rejectWithValue, getState }) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...menuCategoryNFormValues.formValues,
        restaurantId: getState().restaurant.restaurantData._id,
        category: menuCategoryNFormValues.menuCategory,
      }),
    };

    try {
      const response = await fetch(`${localBaseUrl}/menu`, requestOptions);
      if (!response.ok) {
        throw new Error();
      }
      const { addedMenu } = await response.json();
      return addedMenu;
    } catch (error) {
      rejectWithValue();
    }
  }
);

const updateMenu = createAsyncThunk(
  "restaurant/updateMenu",
  async (formValues, { rejectWithValue }) => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...formValues,
      }),
    };

    try {
      const response = await fetch(`${localBaseUrl}/menu`, requestOptions);
      if (!response.ok) {
        throw new Error();
      }
      const { editedMenu } = await response.json();
      return editedMenu;
    } catch (error) {
      rejectWithValue();
    }
  }
);

const deleteMenu = createAsyncThunk(
  "restaurant/deleteMenu",
  async (menuId, { rejectWithValue, getState }) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      const response = await fetch(
        `${localBaseUrl}/menu/${
          getState().user.userData.restaurantId
        }/${menuId}`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error();
      }
      return;
    } catch (error) {
      rejectWithValue();
    }
  }
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    resetUpdateRestaurantStatus: (state) => {
      if (state.updateRestaurantStatus !== "idle") {
        state.updateRestaurantStatus = "idle";
      }
    },
    resetUpdateMenuStatus: (state) => {
      if (state.updateMenuStatus !== "idle") {
        state.updateMenuStatus = "idle";
      }
    },
    resetAddNewMenuStatus: (state) => {
      if (state.addNewMenuStatus !== "idle") {
        state.addNewMenuStatus = "idle";
      }
    },
  },
  extraReducers(builder) {
    builder
      //register restaurant
      .addCase(registerRestaurant.pending, (state, action) => {
        state.registerRestaurantStatus = "loading";
      })
      .addCase(registerRestaurant.fulfilled, (state, action) => {
        state.registerRestaurantStatus = "succeeded";
        state.restaurantData = action.payload;
      })
      .addCase(registerRestaurant.rejected, (state, action) => {
        state.registerRestaurantStatus = "failed";
      })
      //fetch restaurant
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
      //update restaurant
      .addCase(updateRestaurant.pending, (state) => {
        state.updateRestaurantStatus = "loading";
      })
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        state.updateRestaurantStatus = "succeeded";
        state.restaurantData = action.payload;
      })
      .addCase(updateRestaurant.rejected, (state) => {
        state.updateRestaurantStatus = "failed";
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
      })
      //add new menu
      .addCase(addNewMenu.pending, (state, action) => {
        state.addNewMenuStatus = "loading";
      })
      .addCase(addNewMenu.fulfilled, (state, action) => {
        state.addNewMenuStatus = "succeeded";
        state.menuData.push(action.payload);
      })
      .addCase(addNewMenu.rejected, (state, action) => {
        state.addNewMenuStatus = "failed";
      })
      //update menu
      .addCase(updateMenu.pending, (state, action) => {
        state.updateMenuStatus = "loading";
      })
      .addCase(updateMenu.fulfilled, (state, action) => {
        state.updateMenuStatus = "succeeded";
        const index = state.menuData.findIndex(
          (menu) => menu._id === action.payload._id
        );
        state.menuData[index] = action.payload;
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.updateMenuStatus = "failed";
      })
      //delete menu
      .addCase(deleteMenu.pending, (state, action) => {
        state.updateMenuStatus = "loading";
        const index = state.menuData.findIndex(
          (menu) => menu._id === action.meta.arg
        );
        state.menuData[index].menuDeleteLoading = true;
      })
      .addCase(deleteMenu.fulfilled, (state, action) => {
        state.updateMenuStatus = "idle";
        state.menuData = state.menuData.filter(
          (menu) => menu._id !== action.meta.arg
        );
      });
    // .addCase(deleteMenu.rejected, (state) => {
    //   state.updateMenuStatus = "failed";
    // });
  },
});

export {
  fetchRestaurant,
  fetchMenu,
  registerRestaurant,
  updateRestaurant,
  addNewMenu,
  updateMenu,
  deleteMenu,
};

export const {
  resetUpdateRestaurantStatus,
  resetAddNewMenuStatus,
  resetUpdateMenuStatus,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
