"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components";
import { useAppSelector } from "@/redux/hook";
import {
  AiOutlineFileImage,
  AiOutlineFileText,
  AiOutlineLink,
  AiOutlineSmile,
  AiOutlineUser,
} from "react-icons/ai";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { BiCamera, BiSolidPaperPlane } from "react-icons/bi";
import { PiSticker } from "react-icons/pi";
import { useSocket } from "@/providers/socketIo";

const Actions = [
  {
    color: "#4da5fe",
    icon: <AiOutlineFileImage size={24} />,
    y: 70,
    title: "Photo/Video",
  },
  {
    color: "#1b8cfe",
    icon: <PiSticker size={24} />,
    y: 120,
    title: "Stickers",
  },
  {
    color: "#0172e4",
    icon: <BiCamera size={24} />,
    y: 170,
    title: "Image",
  },
  {
    color: "#0159b2",
    icon: <AiOutlineFileText size={24} />,
    y: 220,
    title: "Document",
  },
  {
    color: "#013f7f",
    icon: <AiOutlineUser size={24} />,
    y: 270,
    title: "Contact",
  },
];

const ChatInput = ({ setValue, value, inputRef, isMobile, sideBar }: any) => {
  const [openActions, setOpenActions] = React.useState(false);
  const [openPicker, setOpenPicker] = React.useState(false);

  function handleEmojiClick(emoji: any) {
    const input = inputRef.current;

    if (input) {
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;

      setValue(
        value.substring(0, selectionStart) +
          emoji +
          value.substring(selectionEnd)
      );

      // Move the cursor to the end of the inserted emoji
      input.selectionStart = input.selectionEnd = selectionStart + 1;
    }
  }

  return (
    <div
      className="flex"
      style={{
        width: "100%",
        gap: 10,
        border: "1px solid var(--lightGray-color)",
        padding: 10,
      }}>
      <div
        className="flex"
        style={{ width: "max-content" }}
        tabIndex={0}
        onBlur={() => setOpenActions(false)}>
        <div
          className="flex"
          style={{
            position: "relative",
            display: openActions ? "inline-block" : "none",
          }}>
          {Actions.map((el: any, idx: number) => (
            <Button
              key={idx}
              icon={el.icon}
              onClick={() => setOpenActions(!openActions)}
              wrapperStyle={{ position: "absolute", top: -el.y }}
              style={{ padding: 10, gap: 0 }}
            />
          ))}
        </div>

        <div>
          <AiOutlineLink
            size={25}
            onClick={() => setOpenActions(!openActions)}
          />
        </div>
      </div>

      <textarea
        value={value}
        ref={inputRef}
        onChange={(event: any) => setValue(event.target.value)}
        onFocus={() => setOpenPicker(false)}
        rows={4}
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          fontSize: "14px",
          resize: "none",
          height: 40,
          backgroundColor: "var(--gray-color)",
        }}
      />

      <div className="flex" style={{ position: "relative" }}>
        <div>
          <AiOutlineSmile
            size={25}
            onClick={() => setOpenPicker(!openPicker)}
          />
        </div>

        <div
          className="emojiPicker"
          style={{
            zIndex: 10,
            position: "fixed",
            display: openPicker ? "inline" : "none",
            bottom: 95,
            right: isMobile ? 20 : sideBar?.open ? 420 : 100,
          }}
          tabIndex={1}
          onBlur={() => setOpenPicker(false)}>
          <Picker
            data={data}
            onEmojiSelect={(emoji: any) => handleEmojiClick(emoji.native)}
          />
        </div>
      </div>
    </div>
  );
};

function linkify(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank">${url}</a>`
  );
}

function containsUrl(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlRegex.test(text);
}

const ChatFooter = () => {
  const { current_conversation }: any = useAppSelector(
    (state) => state.conversation.direct_chat
  );
  const { sideBar, room_id }: any = useAppSelector((state) => state.chat);
  const user_id =
    typeof window !== "undefined" && localStorage?.getItem("user_id");
  const { socket } = useSocket();

  const [value, setValue] = useState<string>("");
  const inputRef = useRef<any>(null);

  const textInputHandler = () => {
    if (!value.length) return;

    socket?.emit("text_message", {
      message: linkify(value),
      conversation_id: room_id,
      from: user_id,
      to: current_conversation.user_id,
      type: containsUrl(value) ? "Link" : "Text",
    });
    setValue("");
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "transparent !important",
      }}>
      <div
        style={{
          backgroundColor: "var(--white-color)",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          padding: 2,
        }}>
        <div className="flex" style={{ gap: 4 }}>
          <div className="flex" style={{ width: "100%" }}>
            {/* Chat Input */}
            <ChatInput
              inputRef={inputRef}
              value={value}
              setValue={setValue}
              sideBar={sideBar}
            />
          </div>

          <div
            style={{
              height: 48,
              width: 48,
              borderRadius: 1.5,
            }}>
            <div className="flex" style={{ height: "100%" }}>
              <BiSolidPaperPlane size={22} onClick={textInputHandler} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;
