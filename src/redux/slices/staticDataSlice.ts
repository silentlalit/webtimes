import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "@/providers/axios";
import data from "@/utils/static/static.json";

interface InitialState {
  technologiesList: {
    label: string;
    value: string;
  }[];
  categoriesList: {
    label: string;
    value: string;
  }[];
}

const initialState: InitialState = {
  technologiesList: data.technologiesList,
  categoriesList: data.categoriesList,
};

export const staticDataSlice = createSlice({
  name: "staticDataSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addData.fulfilled, (state, { payload }) => {
      state.technologiesList = payload.data.technologiesList;
      state.categoriesList = payload.data.categoriesList;
    });

    builder.addCase(deleteData.fulfilled, (state, { payload }) => {
      state.technologiesList = payload.data.technologiesList;
      state.categoriesList = payload.data.categoriesList;
    });
  },
});

export default staticDataSlice.reducer;

export const addData = createAsyncThunk(
  "staticDataSlice/addData",
  async (body: any, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/add-data", body);
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

export const deleteData = createAsyncThunk(
  "staticDataSlice/deleteData",
  async (body: any, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(
        `/add-data?data=${JSON.stringify(body)}`
      );
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);
