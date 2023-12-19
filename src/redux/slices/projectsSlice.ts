import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Project } from "@/utils/interface";
import { instance } from "@/providers/axios";

interface InitialState {
  projects: Project[];
  project: Project | null;
  loading: boolean;
  isError: boolean;
  msg: string;
}

const initialState: InitialState = {
  projects: [],
  project: null,
  loading: false,
  isError: false,
  msg: "",
};

export const ProjectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearProject: (state) => {
      state.project = null;
    },
  },
  extraReducers: (builder) => {
    // GET A Single project
    builder
      .addCase(getProject.pending, (state, action) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(getProject.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isError = false;
        state.project = payload.project;
        state.msg = payload.message;
      })
      .addCase(getProject.rejected, (state, { payload }: any) => {
        state.isError = true;
        state.loading = false;
        state.project = null;
        state.msg = payload.error;
      });

    // GET ALL projects
    builder
      .addCase(fetchProjects.pending, (state, action) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchProjects.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isError = false;
        state.projects = payload.projects;
        state.msg = payload.message;
      })
      .addCase(fetchProjects.rejected, (state, { payload }: any) => {
        state.isError = true;
        state.loading = false;
        state.projects = [];
        state.msg = payload.error;
      });

    // CREATE project
    builder.addCase(createProject.fulfilled, (state, { payload }) => {
      state.projects.push(payload.project);
      state.msg = payload.message;
    });

    // UPDATE project
    builder.addCase(updateProject.fulfilled, (state, { payload }) => {
      state.projects.forEach(({ _id }, idx) => {
        if (_id === payload.project._id) {
          state.projects[idx] = payload.project;
          return;
        }
      });
      state.msg = payload.message;
    });

    // DELETE project
    builder.addCase(deleteProject.fulfilled, (state, { payload }) => {
      const projects = state.projects.filter(
        (project) => payload.id != project._id
      );
      state.projects = projects;
      state.msg = payload.message;
    });

    // update Images
    builder.addCase(updateImages.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.project!.images = payload.images;
      state.msg = payload.message;
    });

    // update a Image
    builder.addCase(updateImage.fulfilled, (state, { payload }) => {
      state.project!.images = payload.images;
      state.msg = payload.message;
    });

    // delete a Image
    builder.addCase(deleteImage.fulfilled, (state, { payload }) => {
      state.project!.images = payload.images;
      state.msg = payload.message;
    });
  },
});

export const { clearProject } = ProjectsSlice.actions;
export default ProjectsSlice.reducer;

export const fetchProjects = createAsyncThunk(
  "projects/getAllProjects",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/projects");
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const getProject = createAsyncThunk(
  "projects/getProject",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/projects/${id}`);
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (body: any, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/projects", body);
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (body: any, { rejectWithValue }) => {
    try {
      const id = body.get("id");
      body.delete("id");
      const { data } = await instance.patch(`/projects/${id}`, body);
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id: String, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`/projects/${id}`);
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
  "projects/updateImages",
  async (body: any, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(`/projects/upload`, body);
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
  "projects/updateImage",
  async (body: any, { rejectWithValue }) => {
    try {
      const { data } = await instance.put(`/projects/upload`, body);
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
  "projects/deleteImage",
  async (body: any, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`/projects/upload?data=${body}`);
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);
