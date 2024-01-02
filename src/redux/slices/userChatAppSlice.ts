import { createSlice } from "@reduxjs/toolkit";
import { instance } from "@/providers/axios";
// ----------------------------------------------------------------------

const initialState = {
  user: {},
  sideBar: {
    open: false,
    type: "CONTACT", // can be CONTACT, STARRED, SHARED, LINKS
  },
  tab: 0,
  projectsChat: [],
  chat_type: "",
  room_id: null,
  call_logs: [],
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchCallLogs(state, action) {
      state.call_logs = action.payload.call_logs;
    },
    fetchUser(state, action) {
      state.user = action.payload.user;
    },

    // Toggle Sidebar
    toggleSideBar(state) {
      state.sideBar.open = !state.sideBar.open;
    },
    updateSideBarType(state, action) {
      state.sideBar.type = action.payload.type;
    },
    updateTab(state, action) {
      state.tab = action.payload.tab;
    },

    updateAllProjectsChat(state, action) {
      state.projectsChat = action.payload.projectsChat;
    },

    selectConversation(state, action) {
      state.chat_type = "individual";
      state.room_id = action.payload.room_id;
    },
  },
});

// actions
const {
  fetchCallLogs,
  fetchUser,
  toggleSideBar,
  updateSideBarType,
  updateTab,
  updateAllProjectsChat,
  selectConversation,
} = slice.actions;

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function ToggleSidebar() {
  return async (dispatch: any, getState: any) => {
    dispatch(toggleSideBar());
  };
}

export function UpdateSidebarType(type: any) {
  return async (dispatch: any, getState: any) => {
    dispatch(updateSideBarType({ type }));
  };
}

export function UpdateTab(tab: any) {
  return async (dispatch: any, getState: any) => {
    dispatch(updateTab(tab));
  };
}

export function FetchAllProjectsChat() {
  return async (dispatch: any, getState: any) => {
    await instance
      .get("/user/get-all-verified-projects-chat")
      .then((response: any) => {
        dispatch(
          updateAllProjectsChat({
            projectsChat: response.data.data,
          })
        );
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
}

export const SelectConversation = ({ room_id }: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch(selectConversation({ room_id }));
  };
};

export const FetchCallLogs = () => {
  return async (dispatch: any, getState: any) => {
    instance
      .get("/user/get-call-logs", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response: any) => {
        dispatch(fetchCallLogs({ call_logs: response.data.data }));
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
};

export const FetchUserProfile = () => {
  return async (dispatch: any, getState: any) => {
    instance
      .get("/user/get-me")
      .then((response: any) => {
        dispatch(fetchUser({ user: response.data.data }));
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
};
