import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Testimonial } from "@/utils/interface";
import { instance } from "@/providers/axios";

interface InitialState {
  testimonials: Testimonial[];
  testimonial: Testimonial | null;
  loading: boolean;
  error: boolean;
  msg: string;
}

const initialState: InitialState = {
  testimonials: [],
  testimonial: null,
  loading: false,
  error: false,
  msg: "",
};

export const fetchTestimonials = createAsyncThunk(
  "testimonials/getAllTestimonials",
  async () => {
    const { data } = await instance.get("/testimonials");
    return data;
  }
);

export const getTestimonial = createAsyncThunk(
  "testimonials/getTestimonial",
  async (id: string) => {
    const { data } = await instance.get(`/testimonials/${id}`);
    return data;
  }
);

export const createTestimonial = createAsyncThunk(
  "testimonials/createTestimonial",
  async (body: Testimonial) => {
    const { data } = await instance.post("/testimonials", body);
    return data;
  }
);

export const updateTestimonial = createAsyncThunk(
  "testimonials/updateTestimonial",
  async (body: Testimonial) => {
    const { data } = await instance.patch(`/testimonials/${body._id}`, body);
    return data;
  }
);

export const deleteTestimonial = createAsyncThunk(
  "testimonials/deleteTestimonial",
  async (id: String) => {
    const { data } = await instance.delete(`/testimonials/${id}`);
    return data;
  }
);

export const ReviewsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET a single Testimonial
    builder
      .addCase(getTestimonial.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getTestimonial.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.testimonial = payload.testimonial;
      })
      .addCase(getTestimonial.rejected, (state, { payload }: any) => {
        state.error = true;
        state.loading = false;
        state.testimonial = null;
        // state.errMsg = payload.message;
      });

    // GET ALL projectS
    builder
      .addCase(fetchTestimonials.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTestimonials.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.testimonials = payload.testimonials;
      })
      .addCase(fetchTestimonials.rejected, (state, { payload }: any) => {
        state.error = true;
        state.loading = false;
        state.testimonials = [];
        // state.errMsg = payload.message;
      });

    // CREATE review
    builder
      .addCase(createTestimonial.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.testimonials.push(payload.testimonial);
      })
      .addCase(createTestimonial.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createTestimonial.rejected, (state, { payload }: any) => {
        state.error = true;
        state.loading = false;
        // state.errMsg = payload.message;
      });

    // UPDATE review
    builder
      .addCase(updateTestimonial.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        console.log(state.testimonials);
        state.testimonials?.forEach(({ _id }, idx) => {
          if (_id === payload.testimonial._id) {
            state.testimonials[idx] = payload.testimonial;
            return;
          }
        });
        // state.testimonials = updatedTestimonials
      })
      .addCase(updateTestimonial.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateTestimonial.rejected, (state, { payload }: any) => {
        state.error = true;
        state.loading = false;
        // state.errMsg = payload.message;
      });

    // DELETE project
    builder
      .addCase(deleteTestimonial.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        const testimonials = state.testimonials.filter(
          (testimonial) => payload.id != testimonial._id
        );
        state.testimonials = testimonials;
      })
      .addCase(deleteTestimonial.pending, (state, _) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteTestimonial.rejected, (state, { payload }: any) => {
        state.error = true;
        state.loading = false;
        // state.errMsg = payload.message;
      });
  },
});

export default ReviewsSlice.reducer;
