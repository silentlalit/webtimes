import { combineReducers } from "redux";
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

const rootReducer = combineReducers({
  authUser: authSlice,
  service: servicesSlice,
  project: ProjectsSlice,
  skill: skillsSlice,
  testimonial: testimonialsSlice,
  user: userSlice,
  staticData: staticDataSlice,
  order: orderSlice,

  chat: userChatApp,
  conversation: conversationSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
