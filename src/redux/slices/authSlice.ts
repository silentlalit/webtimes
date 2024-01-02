import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "@/providers/axios";
import { User } from "@/utils/interface";

interface InitialState {
  logggedInUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  isError: boolean;
  msg: string;
}

const initialState: InitialState = {
  logggedInUser: null,
  isAuthenticated: false,
  loading: false,
  isError: false,
  msg: "",
};

export const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    clearErrorMsg: (state) => {
      state.msg = "";
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    // Login User
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isError = false;

        state.logggedInUser = payload.user;
        state.isAuthenticated = true;
        localStorage.setItem("user_id", payload.user._id);
      })
      .addCase(login.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.isError = true;

        state.logggedInUser = null;
        state.isAuthenticated = false;
        state.msg = payload.error;
      });

    // Signup User / Create User
    builder
      .addCase(signUp.pending, (state, action) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isError = false;
        state.msg = payload.message;
      })
      .addCase(signUp.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.isError = true;
        state.msg = payload.error;
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isError = false;

        state.logggedInUser = null;
        state.isAuthenticated = false;
        state.msg = payload.message;
        localStorage.removeItem("user_id");
      })
      .addCase(logout.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.isError = true;
        state.msg = payload.error;
      });

    // User verifying
    builder
      .addCase(verifyUser.pending, (state, _) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(verifyUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isError = false;

        state.logggedInUser = payload.user;
        state.msg = payload.message;
        localStorage.setItem("user_id", payload.user._id);
      })
      .addCase(verifyUser.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.isError = true;
        state.msg = payload.error || "Something went wrong.";
      });

    // GET LOAD USER
    builder
      .addCase(loadUser.fulfilled, (state, { payload }) => {
        state.logggedInUser = payload.user;
        state.isAuthenticated = true;
        state.isError = false;
        localStorage.setItem("user_id", payload.user._id);
      })
      .addCase(loadUser.rejected, (state) => {
        state.logggedInUser = null;
        state.isAuthenticated = false;
        state.isError = true;
        localStorage.removeItem("user_id");
      });

    // Update address
    builder
      .addCase(updateAddress.fulfilled, (state, { payload }) => {
        state.logggedInUser!.address = payload.address;
        state.isError = false;
      })
      .addCase(updateAddress.rejected, (state) => {
        state.logggedInUser!.address = {
          fullName: state.logggedInUser?.name,
        };
        state.isError = false;
      });
  },
});

export const { clearErrorMsg } = authSlice.actions;
export default authSlice.reducer;

export const signUp = createAsyncThunk(
  "authUser/createUser",
  async (body: User, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/auth/signup", body);
      return data;
    } catch (error: any) {
      console.log("authSlice", error.response.data);
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "authUser/loginUser",
  async (body: { email: String; password: String }, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/auth/login", body);
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "authUser/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/auth/logout");
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyUser = createAsyncThunk(
  "authUser/verifyUser",
  async (token: string, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/auth/verifyemail", {
        token: `${token}`,
      });
      return data;
    } catch (error: any) {
      console.log(error);
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const loadUser = createAsyncThunk(
  "authUser/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("auth/loadUser");
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "authUser/updateAddress",
  async (body: any, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("auth/update-address", body);
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);
