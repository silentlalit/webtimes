"use client";

import React, { useEffect, useRef } from "react";
import styles from "@/styles/userChatPage.module.scss";
import ChatListSidebar from "./ChatListSidebar";
import Conversation from "./Conversation";
import ChatHeader from "./(components)/ChatHeader";
import ChatFooter from "./(components)/ChatFooter";
import UserProfileSideBar from "./UserProfileSideBar";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Image from "next/image";
import { useSocket } from "@/providers/socketIo";
import { SelectConversation } from "@/redux/slices/userChatAppSlice";
import { ReadAllMsg } from "@/redux/slices/conversationSlice";

const {
  conversationPage,
  leftBox,
  rightBox,
  conversationBox,
  showUserProfileSection,
  hideUserProfileSection,
} = styles;

const Page = ({ searchParams }: any) => {
  const messageListRef = useRef<any>(null);
  const { current_messages }: any = useAppSelector(
    (state) => state.conversation.direct_chat
  );
  const {
    sideBar: { open, type },
    room_id,
  } = useAppSelector((state) => state.chat);
  const { socket } = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    room_id &&
      (messageListRef.current.scrollTop = messageListRef.current.scrollHeight);
  }, [room_id, current_messages]);

  useEffect(() => {
    socket?.emit("set_conversation_id", {
      conversation_id: room_id,
    });
  }, [socket, room_id]);

  useEffect(() => {
    dispatch(SelectConversation({ room_id: searchParams.room_id }));
    dispatch(ReadAllMsg({ room_id: searchParams.room_id }));
  }, [searchParams.room_id, dispatch]);

  return (
    <div className={conversationPage}>
      <div className={leftBox}>
        <ChatListSidebar />
      </div>

      <div className={rightBox}>
        {room_id ? (
          <>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}>
              <ChatHeader />

              <div ref={messageListRef} className={conversationBox}>
                <Conversation menu={true} isMobile={false} />
              </div>

              <ChatFooter />
            </div>

            <div
              className={`flex ${
                open ? showUserProfileSection : hideUserProfileSection
              }`}>
              <UserProfileSideBar open={open} type={type} />
            </div>
          </>
        ) : (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              backgroundColor: "var(--white-color)",
            }}>
            <Image src={"/chat_img.jpg"} sizes="100%" fill alt="chat_img" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
