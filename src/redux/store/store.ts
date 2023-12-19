import { configureStore } from "@reduxjs/toolkit";
// import { createWrapper } from "next-redux-wrapper";

import servicesSlice from "../slices/servicesSlice";
import ProjectsSlice from "../slices/projectsSlice";
import skillsSlice from "../slices/skillsSlice";
import testimonialsSlice from "../slices/testimonialsSlice";
import authSlice from "../slices/authSlice";
import userSlice from "../slices/userSlice";
import staticDataSlice from "../slices/staticDataSlice";
import orderSlice from "../slices/orderSlice";
import userChatApp from "../slices/userChatAppSlice";
import conversationSlice from "../slices/conversationSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      service: servicesSlice,
      project: ProjectsSlice,
      skill: skillsSlice,
      testimonial: testimonialsSlice,
      authUser: authSlice,
      user: userSlice,
      staticData: staticDataSlice,
      order: orderSlice,

      chat: userChatApp,
      conversation: conversationSlice,
    },
  });

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// export const wrapper = createWrapper<AppStore>(makeStore);
