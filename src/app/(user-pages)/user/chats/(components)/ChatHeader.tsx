"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React from "react";
import Avatar from "./Avatar";
// import { BsCameraVideo } from "react-icons/bs";
// import { IoCallOutline } from "react-icons/io5";
import { ToggleSidebar } from "@/redux/slices/userChatAppSlice";

const ChatHeader = () => {
  const dispatch = useAppDispatch();
  const { current_conversation }: any = useAppSelector(
    (state) => state.conversation.direct_chat
  );

  // const [conversationMenuAnchorEl, setConversationMenuAnchorEl] =
  // React.useState(null);
  // const openConversationMenu = Boolean(conversationMenuAnchorEl);

  // const handleClickConversationMenu = (event: any) => {
  //   setConversationMenuAnchorEl(event.currentTarget);
  // };
  // const handleCloseConversationMenu = () => {
  //   setConversationMenuAnchorEl(null);
  // };

  return (
    <>
      <div
        style={{
          backgroundColor: "var(--white-color)",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          padding: 12,
          width: "100%",
        }}>
        <div
          className="flex"
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
          }}>
          <div
            className="flex"
            style={{ gap: 8 }}
            onClick={() => dispatch(ToggleSidebar())}>
            <div>
              <Avatar online={true} />
            </div>
            <div
              className="flex"
              style={{
                flexDirection: "column",
                gap: 2,
                alignItems: "flex-start",
              }}>
              <h4>
                {current_conversation?.chat_name} (
                <span>{current_conversation?.name}</span>)
              </h4>
              <p style={{ marginTop: 0, fontSize: 12 }}>Online</p>
            </div>
          </div>
          {/* <div className="flex" style={{ gap: 15 }}>
            <BsCameraVideo
              size={20}
              onClick={() => {
                dispatch(StartVideoCall(current_conversation.user_id));
              }}
            />
            <IoCallOutline
              size={20}
              onClick={() => {
                dispatch(StartAudioCall(current_conversation.user_id));
              }}
            />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
