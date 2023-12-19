import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Service } from "@/utils/interface";
import { instance } from "@/providers/axios";

interface InitialState {
  services: Service[];
  service: Service | null;
  loading: boolean;
  isError: boolean;
  msg: string;
}

const initialState: InitialState = {
  services: [],
  service: null,
  loading: false,
  isError: false,
  msg: "",
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    clearService: (state) => {
      state.service = null;
    },
  },
  extraReducers: (builder) => {
    // GET Single SERVICE
    builder
      .addCase(getService.pending, (state, action) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(getService.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isError = false;
        state.service = payload.service;
        state.msg = payload.message;
      })
      .addCase(getService.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.isError = true;
        state.service = null;
        state.msg = payload.error;
      });

    // GET ALL SERVICES
    builder
      .addCase(fetchServices.pending, (state, action) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchServices.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isError = false;
        state.services = payload.services;
        state.msg = payload.message;
      })
      .addCase(fetchServices.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.isError = true;
        state.services = [];
        state.msg = payload.error;
      });

    // CREATE SERVICE
    builder.addCase(createService.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isError = false;
      state.services.push(payload.service);
      state.msg = payload.message;
    });

    // UPDATE SERVICE
    builder.addCase(updateService.fulfilled, (state, { payload }: any) => {
      state.loading = false;
      state.isError = false;
      state.service = payload.service;
      state.services.forEach((service, idx) => {
        if (service._id === payload.service._id) {
          state.services[idx] = payload.service;
          return;
        }
      });
      state.msg = payload.message;
    });

    // DELETE SERVICE
    builder.addCase(deleteService.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isError = false;
      payload.service = null;
      state.services = state.services.filter(
        (service) => payload.id != service._id
      );
      state.msg = payload.message;
    });

    // update Images
    builder.addCase(updateImages.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.service!.images = payload.images;
      state.msg = payload.message;
    });

    // update a Image
    builder.addCase(updateImage.fulfilled, (state, { payload }) => {
      state.service!.images = payload.images;
      state.msg = payload.message;
    });

    // delete a Image
    builder.addCase(deleteImage.fulfilled, (state, { payload }) => {
      state.service!.images = payload.images;
      state.msg = payload.message;
    });
  },
});

export const { clearService } = servicesSlice.actions;
export default servicesSlice.reducer;

export const fetchServices = createAsyncThunk(
  "services/getAllServices",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/services");
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const getService = createAsyncThunk(
  "services/getService",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/services/${id}`);
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createService = createAsyncThunk(
  "services/createService",
  async (body: any, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/services", body);
      console.log(data);
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

export const updateService = createAsyncThunk(
  "services/updateService",
  async (body: any, { rejectWithValue }) => {
    try {
      const id = body.get("id");
      body.delete("id");
      const { data } = await instance.patch(`/services/${id}`, body);
      console.log(data);
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

export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (id: String, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`/services/${id}`);
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateImages = createAsyncThunk(
  "services/updateImages",
  async (body: any, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(`/services/upload`, body);
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateImage = createAsyncThunk(
  "services/updateImage",
  async (body: any, { rejectWithValue }) => {
    try {
      const { data } = await instance.put(`/services/upload`, body);
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteImage = createAsyncThunk(
  "services/deleteImage",
  async (body: any, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`/services/upload?data=${body}`);
      console.log(data);
      return data;
    } catch (error: any) {
      console.log(error.response.data);
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);
