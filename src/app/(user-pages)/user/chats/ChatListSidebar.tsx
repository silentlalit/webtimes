"use client";

import React, { useEffect, useState } from "react";
import { VscPinned } from "react-icons/vsc";
import ChatElement from "./(components)/ChatElement";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { FetchDirectConversations } from "@/redux/slices/conversationSlice";
import { useSocket } from "@/providers/socketIo";
import { Loader, Tooltip } from "@/components";
import { IoIosRefresh } from "react-icons/io";

const ChatListSidebar = () => {
  const dispatch = useAppDispatch();
  const { conversations } = useAppSelector(
    (state) => state.conversation.direct_chat
  );
  const { isConnected, socket } = useSocket();
  const [refreshChats, setRefreshChats] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    setLoading(true);
    socket?.emit("get_conversations_list", { user_id }, (data: any) => {
      // console.log(data)
      dispatch(FetchDirectConversations({ conversations: data }));
      setLoading(false);
    });
  }, [socket, isConnected, refreshChats, dispatch]);

  return (
    <div>
      {isConnected ? (
        <>
          {!conversations.length && (
            <>
              <div
                className="flex"
                style={{ justifyContent: "flex-start", marginBottom: 20 }}>
                <Tooltip text={"Refresh Chats"} style={{ left: 50 }}>
                  <IoIosRefresh
                    size={20}
                    color="var(--black-color)"
                    style={{ marginRight: 20, cursor: "pointer", transition: "all 0.2s ease" }}
                    onClick={() => setRefreshChats(!refreshChats)}
                    onMouseDownCapture={(e:any) => e.target.style.transform = "rotate(90deg)"}
                    onMouseUpCapture={(e:any) => e.target.style.transform = "rotate(0deg)"}
                  />
                </Tooltip>
                <h4>Active Chats about orders</h4>
              </div>

              {loading && <Loader style={{ width: 50, height: 50 }} />}
            </>
          )}

          <h4 
            className="flex"
            style={{
              paddingBottom: 10,
              borderBottom: "1px solid var(--lightGray-color)",
              justifyContent: "start"
            }}>
            <VscPinned /> <span>Pinned Chats</span>
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
