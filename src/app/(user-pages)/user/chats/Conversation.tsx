"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from "@/components/MsgType";
import { useSocket } from "@/providers/socketIo";
import {
  FetchCurrentMessages,
  SetCurrentConversation,
} from "@/redux/slices/conversationSlice";

const Conversation = ({ isMobile, menu }: any) => {
  const dispatch = useAppDispatch();
  const { conversations, current_messages }: any = useAppSelector(
    (state) => state.conversation.direct_chat
  );
  const { room_id }: any = useAppSelector((state) => state.chat);
  const { socket } = useSocket();

  useEffect(() => {
    const current = conversations?.find((el: any) => el?.id === room_id);
    dispatch(SetCurrentConversation(current));

    socket?.emit("get_messages", { conversation_id: room_id }, (data: any) => {
      dispatch(FetchCurrentMessages({ messages: data }));
    });
  }, [socket, room_id, dispatch, conversations]);

  return (
    <div style={{ padding: isMobile ? 4 : 8 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {current_messages?.map((el: any, idx: any) => {
          switch (el?.type) {
            case "divider":
              return (
                // Timeline
                <Timeline key={idx} el={el} />
              );

            case "msg":
              switch (el.subtype) {
                case "img":
                  return <MediaMsg key={idx} el={el} menu={menu} />;

                case "doc":
                  return <DocMsg key={idx} el={el} menu={menu} />;

                case "Link":
                  return <LinkMsg key={idx} el={el} menu={menu} />;

                case "reply":
                  return <ReplyMsg key={idx} el={el} menu={menu} />;

                default:
                  return <TextMsg key={idx} el={el} menu={menu} />;
              }

            default:
              return <></>;
          }
        })}
      </div>
    </div>
  );
};

export default Conversation;
