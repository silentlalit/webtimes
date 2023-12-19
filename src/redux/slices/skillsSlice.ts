import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Skill } from "@/utils/interface";
import { instance } from "@/providers/axios";

interface InitialState {
  skills: Skill[];
  skill: Skill | null;
  loading: boolean;
  isError: boolean;
  msg: string;
}

const initialState: InitialState = {
  skills: [],
  skill: null,
  loading: false,
  isError: false,
  msg: "",
};

export const fetchSkills = createAsyncThunk(
  "skills/getAllSkills",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/skills", {});
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const getSkill = createAsyncThunk(
  "skills/getSkill",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/skills/${id}`);
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createSkill = createAsyncThunk(
  "skills/createSkill",
  async (body: any, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/skills", body);
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSkill = createAsyncThunk(
  "skills/updateSkill",
  async (body: any, { rejectWithValue }) => {
    try {
      const id = body.get("id");
      body.delete("id");
      const { data } = await instance.patch(`/skills/${id}`, body);
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSkill = createAsyncThunk(
  "skills/deleteSkill",
  async (id: String, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`/skills/${id}`);
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const SkillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    clearSkill: (state) => {
      state.skill = null;
    },
  },
  extraReducers: (builder) => {
    // GET ALL Skills
    builder
      .addCase(fetchSkills.pending, (state, _) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchSkills.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isError = false;
        state.skills = payload.skills;
        state.msg = payload.message;
      })
      .addCase(fetchSkills.rejected, (state, { payload }: any) => {
        state.isError = true;
        state.loading = false;
        state.skills = [];
        state.msg = payload.error;
      });

    // GET a single Skill
    builder
      .addCase(getSkill.pending, (state, action) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(getSkill.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isError = false;
        state.skill = payload.skill;
        state.msg = payload.message;
      })
      .addCase(getSkill.rejected, (state, { payload }: any) => {
        state.isError = true;
        state.loading = false;
        state.skill = null;
        state.msg = payload.error;
      });

    // CREATE skill
    builder.addCase(createSkill.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isError = false;
      state.skills.push(payload.skill);
      state.msg = payload.message;
    });

    // UPDATE skill
    builder.addCase(updateSkill.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isError = false;
      state.skills.forEach((skill, idx) => {
        if (skill._id === payload.skill._id) {
          state.skills[idx] = payload.skill;
        }
      });
      state.msg = payload.message;
    });

    // DELETE skill
    builder.addCase(deleteSkill.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isError = false;
      const skills = state.skills.filter((skill) => payload.id != skill._id);
      state.skills = skills;
      state.msg = payload.message;
    });
  },
});

export const { clearSkill } = SkillsSlice.actions;
export default SkillsSlice.reducer;
