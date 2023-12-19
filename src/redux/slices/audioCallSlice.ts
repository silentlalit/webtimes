// import { createSlice } from "@reduxjs/toolkit";
// import { instance } from "@/providers/axios";

// const initialState = {
//   open_audio_dialog: false,
//   open_audio_notification_dialog: false,
//   call_queue: [],
//   incoming: false,
// };

// const slice = createSlice({
//   name: "audioCall",
//   initialState,
//   reducers: {
//     pushToAudioCallQueue(state: any, { payload }: any) {
//       // check audio_call_queue in redux store
//       const {
//         call,
//         incoming,
//       }: {
//         call: any;
//         incoming: boolean;
//       } = payload;

//       if (state.call_queue.length === 0) {
//         state.call_queue.push(call);
//         if (incoming) {
//           state.open_audio_notification_dialog = true; // this will open up the call dialog
//           state.incoming = true;
//         } else {
//           state.open_audio_dialog = true;
//           state.incoming = false;
//         }
//       } else {
//         // if queue is not empty then emit user_is_busy => in turn server will send this event to sender of call
//         socket.emit("user_is_busy_audio_call", { ...payload });
//       }

//       // Ideally queue should be managed on server side
//     },
//     resetAudioCallQueue(state) {
//       state.call_queue = [];
//       state.open_audio_notification_dialog = false;
//       state.incoming = false;
//     },
//     closeNotificationDialog(state) {
//       state.open_audio_notification_dialog = false;
//     },
//     updateCallDialog(state, action) {
//       state.open_audio_dialog = action.payload.state;
//       state.open_audio_notification_dialog = false;
//     },
//   },
// });

// // Reducer
// export default slice.reducer;

// // ----------------------------------------------------------------------

// export const StartAudioCall = (id: any) => {
//   return async (dispatch: any, getState: any) => {
//     dispatch(slice.actions.resetAudioCallQueue());
//     instance
//       .post("/user/start-audio-call", { id })
//       .then((response: any) => {
//         console.log(response);
//         const data: {
//           call: any;
//           incoming: boolean;
//         } = {
//           call: response.data.data,
//           incoming: false,
//         };

//         dispatch(slice.actions.pushToAudioCallQueue(data));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

// export const PushToAudioCallQueue = (call: any) => {
//   return async (dispatch: any, getState: any) => {
//     dispatch(slice.actions.pushToAudioCallQueue({ call, incoming: true }));
//   };
// };

// export const ResetAudioCallQueue = () => {
//   return async (dispatch: any, getState: any) => {
//     dispatch(slice.actions.resetAudioCallQueue());
//   };
// };

// export const CloseAudioNotificationDialog = () => {
//   return async (dispatch: any, getState: any) => {
//     dispatch(slice.actions.closeNotificationDialog());
//   };
// };

// export const UpdateAudioCallDialog = ({ state }: any) => {
//   return async (dispatch: any, getState: any) => {
//     dispatch(slice.actions.updateCallDialog({ state }));
//   };
// };
