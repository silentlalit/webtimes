import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Order } from "@/utils/interface";
import { instance } from "@/providers/axios";

interface InitialState {
  orders: Order[];
  order: Order | null;
  loading: boolean;
  isError: boolean;
  msg: string;
}

const initialState: InitialState = {
  orders: [],
  order: null,
  loading: false,
  isError: false,
  msg: "",
};

export const ProjectsSlice: any = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    // create order
    builder.addCase(createOrder.fulfilled, (state, { payload }) => {
      state.orders.push(payload.order);
    });

    // get a order details
    builder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.order = payload.order;
      })
      .addCase(getOrder.rejected, (state, { payload }) => {
        state.loading = false;
        state.order = null;
      });

    // get All orders
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = payload.orders;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.loading = false;
        state.orders = [];
      });

    // Update orders Status
    builder.addCase(updateOrderStatus.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.order = payload.order;
    });
  },
});

export const { clearOrder } = ProjectsSlice.actions;
export default ProjectsSlice.reducer;

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (body: any, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/order/create-order", body);
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (userId: any, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/order/user-orders/${userId}`);
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

export const getOrder = createAsyncThunk(
  "orders/getOrder",
  async (id: any, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/order/${id}`);
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async (body: any, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(`/order/${body.id}`, body.status);
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);
