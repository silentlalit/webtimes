// import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";
// import { AWS_S3_REGION, S3_BUCKET_NAME } from "../../config";

const user_id =
  typeof window !== "undefined" && localStorage?.getItem("user_id");

interface initialState {
  direct_chat: {
    conversations: any[];
    current_conversation: any;
    current_messages: any[];
  };
  group_chat: any;
}

const initialState: initialState = {
  direct_chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
  },
  group_chat: {},
};

const conversationSlice = createSlice({
  name: "conversationSlice",
  initialState,
  reducers: {
    fetchDirectConversations(state, action) {
      const list = action.payload.conversations.map((el: any) => {
        const otherUser = el.participants.find(
          (elm: any) => elm._id.toString() !== user_id
        );

        return {
          id: el._id,
          chat_name: el.name,

          user_id: otherUser?._id,
          img: otherUser?.avatar,
          name: otherUser?.name,
          email: otherUser?.email,
          username: otherUser?.username,
          online: otherUser?.status === "Online",
          msg: el.messages?.slice(-1)[0]?.text,
          time: el.messages?.slice(-1)[0]?.created_at,
          unread: el?.unreadMsg?.user === user_id ? el.unreadMsg.unread : 0,
          pinned: false,

          // about the order
          orderId: el.orderId,
        };
      });

      state.direct_chat.conversations = list;
    },

    updateDirectConversation(state, action) {
      const this_conversation = action.payload.conversation;
      state.direct_chat.conversations = state.direct_chat.conversations?.map(
        (el: any) => {
          if (el?.id !== this_conversation._id) {
            return el;
          } else {
            const user = this_conversation.participants.find(
              (elm: any) => elm._id.toString() !== user_id
            );

            return {
              id: this_conversation._id._id,
              chat_name: this_conversation.name,

              user_id: user?._id,
              img: user?.avatar,
              name: user?.name,
              email: user?.email,
              username: user?.username,
              online: user?.status === "Online",
              msg: this_conversation.messages?.slice(-1)[0]?.text,
              time: this_conversation.messages?.slice(-1)[0]?.created_at,
              unread: 0,
              pinned: false,

              // about the order
              orderId: this_conversation.orderId,
            };
          }
        }
      );
    },

    addDirectConversation(state, action) {
      const this_conversation = action.payload.conversation;
      const user = this_conversation.participants.find(
        (elm: any) => elm._id.toString() !== user_id
      );
      state.direct_chat.conversations = state.direct_chat.conversations.filter(
        (el) => el?.id !== this_conversation._id
      );
      state.direct_chat.conversations.push({
        id: this_conversation._id._id,
        chat_name: this_conversation.name,

        user_id: user?._id,
        img: user?.avatar,
        name: user?.name,
        email: user?.email,
        username: user?.username,
        online: user?.status === "Online",
        msg: this_conversation.messages?.slice(-1)[0]?.text,
        time: this_conversation.messages?.slice(-1)[0]?.created_at,
        unread: 0,
        pinned: false,

        // about the order
        orderId: this_conversation.orderId,
      });
    },

    setCurrentConversation(state, action) {
      state.direct_chat.current_conversation = action.payload;
    },

    fetchCurrentMessages(state, action) {
      const messages = action.payload.messages;
      const formatted_messages = messages.map((el: any) => ({
        id: el._id,
        type: "msg",
        subtype: el.type,
        message: el.text,
        incoming: el.to === user_id,
        outgoing: el.from === user_id,
      }));
      state.direct_chat.current_messages = formatted_messages;
    },

    addDirectMessage(state, action) {
      const {
        payload: {
          msgData: { message, conversation_id },
        },
      } = action;

      if (state.direct_chat?.current_conversation?.id === conversation_id) {
        state.direct_chat.current_messages.push(message);
      }

      state.direct_chat.conversations.forEach((conv) => {
        if (conv.id === conversation_id) {
          conv.msg = message.message;
        }

        if (
          conv.id === conversation_id &&
          conversation_id !== state.direct_chat?.current_conversation?.id
        ) {
          conv.unread += 1;
        }
      });
    },

    readAllMsg(state, action) {
      state.direct_chat.conversations.forEach((conv) => {
        if (conv.id === action.payload.room_id) conv.unread = 0;
      });
    },
  },
});

export default conversationSlice.reducer;

export const FetchDirectConversations = ({ conversations }: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch(
      conversationSlice.actions.fetchDirectConversations({ conversations })
    );
  };
};
export const AddDirectConversation = ({ conversation }: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch(conversationSlice.actions.addDirectConversation({ conversation }));
  };
};
export const UpdateDirectConversation = ({ conversation }: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch(
      conversationSlice.actions.updateDirectConversation({ conversation })
    );
  };
};

export const SetCurrentConversation = (current_conversation: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch(
      conversationSlice.actions.setCurrentConversation(current_conversation)
    );
  };
};

export const FetchCurrentMessages = ({ messages }: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch(conversationSlice.actions.fetchCurrentMessages({ messages }));
  };
};

export const AddDirectMessage = (msgData: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch(conversationSlice.actions.addDirectMessage({ msgData }));
  };
};

export const ReadAllMsg = ({ room_id }: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch(conversationSlice.actions.readAllMsg({ room_id }));
  };
};
