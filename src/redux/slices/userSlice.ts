import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/utils/interface";
import { instance } from "@/providers/axios";

interface InitialState {
  users: User[];
  user: User | null;
  loading: boolean;
  isError: boolean;
  msg: string;
}

const initialState: InitialState = {
  users: [],
  user: null,
  loading: false,
  isError: false,
  msg: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get single user
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isError = false;
        state.user = payload.user;
        state.msg = payload.message;
      })
      .addCase(fetchUser.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.isError = true;
        state.user = null;
        state.msg = payload.error;
      });

    // Get all Users
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isError = false;
        state.users = payload.users;
        state.msg = payload.message;
      })
      .addCase(fetchUsers.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.isError = true;
        state.users = [];
        state.msg = payload.error;
      });

    // UPDATE User
    builder
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isError = false;
        state.users.forEach((user) => {
          if (user._id === payload.user._id) {
            user = payload.user;
          }
        });
        state.msg = payload.message;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(updateUser.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.isError = true;
        state.msg = payload.error;
      });

    // DELETE User
    builder
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isError = false;
        const users = state.users.filter((user) => payload.id != user._id);
        state.users = users;
        state.msg = payload.message;
      })
      .addCase(deleteUser.pending, (state, _) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(deleteUser.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.isError = true;
        state.msg = payload.error;
      });
  },
});

export default userSlice.reducer;

export const fetchUsers = createAsyncThunk("users/getAllUsers", async () => {
  const { data } = await instance.get("/auth/users");
  return data;
});

export const fetchUser = createAsyncThunk(
  "users/getUser",
  async (id: string) => {
    const { data } = await instance.get(`/auth/user/${id}`);
    return data;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (body: User) => {
    const { data } = await instance.patch(`/auth/user/${body._id}`, body);
    return data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: String) => {
    const { data } = await instance.delete(`/auth/users/${id}`);
    return data;
  }
);
