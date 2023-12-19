"use client";

import React, { useEffect, useState } from "react";
import { VscPinned } from "react-icons/vsc";
import ChatElement from "./(components)/ChatElement";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { FetchDirectConversations } from "@/redux/slices/conversationSlice";
import { useSocket } from "@/providers/socketIo";
import { Tooltip } from "@/components";
import { IoIosRefresh } from "react-icons/io";
// import { ChatList } from "@/utils/static/data";

const ChatListSidebar = () => {
  const dispatch = useAppDispatch();
  const { conversations } = useAppSelector(
    (state) => state.conversation.direct_chat
  );
  const { isConnected, socket } = useSocket();
  const [refreshChats, setRefreshChats] = useState(false);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    socket?.emit("get_conversations_list", { user_id }, (data: any) => {
      dispatch(FetchDirectConversations({ conversations: data }));
    });
  }, [socket, refreshChats, dispatch]);

  return (
    <div>
      {isConnected ? (
        <>
          {!conversations.length && (
            <div className="flex" style={{ justifyContent: "flex-start" }}>
              <Tooltip text={"Refresh Chats"} style={{ left: 50 }}>
                <IoIosRefresh
                  size={20}
                  color="var(--black-color)"
                  style={{ marginRight: 20, cursor: "pointer" }}
                  onClick={() => setRefreshChats(!refreshChats)}
                />
              </Tooltip>
              <h4>Active Chats about orders</h4>
            </div>
          )}
          <h4
            style={{
              paddingBottom: 10,
              borderBottom: "1px solid var(--lightGray-color)",
            }}>
            <VscPinned /> Pinned Chats
          </h4>

          {conversations.filter((el) => el.pinned).length ? (
            conversations
              .filter((el) => el.pinned)
              .map((el) => <ChatElement key={el.id} {...el} />)
          ) : (
            <p>No Pinned chats.</p>
          )}

          <h4
            style={{
              marginTop: 15,
              paddingBottom: 10,
              borderBottom: "1px solid var(--lightGray-color)",
            }}>
            All Chats
          </h4>

          {conversations.filter((el) => !el.pinned).length ? (
            conversations
              .filter((el) => !el.pinned)
              .map((el) => <ChatElement key={el.id} {...el} />)
          ) : (
            <p>No chats available.</p>
          )}
        </>
      ) : (
        <>
          <p>Please wait, Connecting....</p>
        </>
      )}
    </div>
  );
};

export default ChatListSidebar;
