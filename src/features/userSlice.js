import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { localBaseUrl } from "../components/utils/baseUrl";

const initializeFun = () => {
  const userData =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : {};
  const updateStatus = "idle" || "loading" || "succeeded" || "failed";
  const loginStatus = "idle";
  const registerStatus = "idle";
  const error = "";
  const online = false;

  let isLoggedIn = false;

  const token = localStorage.getItem("token");
  if (token) {
    const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
    isLoggedIn = true;

    if (new Date().getTime() > jwtPayload.exp * 1000) {
      //token is expire
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      isLoggedIn = false;
    }
  }

  return {
    updateStatus,
    loginStatus,
    registerStatus,
    online,
    isLoggedIn,
    error,
    userData,
  };
};

const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formValues, { rejectWithValue }) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formValues,
        phone:
          formValues.phone[0] === "0"
            ? formValues.phone.slice(1)
            : formValues.phone.slice(0),
      }),
    };

    try {
      const response = await fetch(
        `${localBaseUrl}/auth/register`,
        requestOptions
      );
      if (!response.ok) {
        const { msg } = await response.json();
        const e = new Error(msg);
        e.name = "ServerInternalError";
        if (response.status === 400) {
          e.name = "ServerValidationError";
        }

        throw e;
      }
      const { token, user } = await response.json();
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      return user;
    } catch (error) {
      if (error.name === "ServerValidationError") {
        return rejectWithValue({ serverError: error.message });
      }
      return rejectWithValue(error.message);
    }
  }
);

const loginUser = createAsyncThunk(
  "user/login",
  async ({ phone, password }, { rejectWithValue }) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: phone[0] === "0" ? phone.slice(1) : phone.slice(0),
        password,
      }),
    };
    try {
      const response = await fetch(
        `${localBaseUrl}/auth/login`,
        requestOptions
      );
      if (!response.ok) {
        const { msg } = await response.json();
        throw new Error(msg); //reject with reply from server
      }
      const { user, token } = await response.json();
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      return { user, token };
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

const updateUser = createAsyncThunk(
  "user/updateUser",
  async (formValues, { rejectWithValue }) => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...formValues,
        phone:
          formValues.phone[0] === "0"
            ? formValues.phone.slice(1)
            : formValues.phone.slice(0),
        extraPhone:
          formValues.extraPhone[0] === "0"
            ? formValues.extraPhone.slice(1)
            : formValues.extraPhone.slice(0),
      }),
    };

    try {
      const response = await fetch(`${localBaseUrl}/users`, requestOptions);
      if (!response.ok) {
        const { msg } = await response.json();
        const e = new Error(msg);
        e.name = "ServerInternalError";
        if (response.status === 400) {
          e.name = "ServerValidationError";
        }

        throw e;
      }
      const { updatedUser } = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      if (error.name === "ServerValidationError") {
        return rejectWithValue({ serverError: error.message });
      }
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initializeFun,
  reducers: {
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userData = {};
    },
    setOnline: (state) => {
      state.online = true;
    },
    setOffline: (state) => {
      state.online = false;
    },
    resetStatusAndError: (state) => {
      state.updateStatus = "idle";
      state.error = "";
    },
    updateUserRestaurantId: (state, action) => {
      state.userData.restaurantId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.registerStatus = "loading";
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerStatus = "succeeded";
        state.userData = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state, action) => {
        state.loginStatus = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        // Add any fetched posts to the array
        state.userData = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload;
      })

      .addCase(updateUser.pending, (state, action) => {
        state.updateStatus = "loading";
        state.error = "";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.userData = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      });
  },
});

export { loginUser, updateUser, registerUser };

export const {
  logoutUser,
  setOnline,
  setOffline,
  resetStatusAndError,
  updateUserRestaurantId,
} = userSlice.actions;

export default userSlice.reducer;
