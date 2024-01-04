"use client";

import React from "react";
import { useAppSelector } from "@/redux/hook";
import { trimContent } from "@/utils/utileFun";
import Avatar from "./Avatar";
import { useRouter } from "next/navigation";

const styles = {
  styledChatBox: {
    width: "100%",
    padding: 8,
    marginTop: 10,
    borderRadius: "8px",
    cursor: "pointer",
  },
};

const ChatElement = ({
  img,
  chat_name,
  msg,
  time,
  unread,
  online,
  id,
}: any) => {
  const { room_id }: { room_id: string | null } = useAppSelector(
    (state) => state.chat
  );
  const { push } = useRouter();
  let isSelected = room_id ? room_id === id : false;

  const showTime = (time: string) => {
    const date = new Date(time);
    const today = new Date();

    const diff = today.getTime() - date.getTime();
    if (diff > 86400000) {
      return date.toLocaleDateString();
    }

    const t = date.toLocaleTimeString().split(":");
    return t[0] + ":" + t[1];
  };

  const handleContextMenu = (e: any) => {
    e.preventDefault();
  };

  return (
    <div
      style={{
        ...styles.styledChatBox,
        backgroundColor: isSelected
          ? "var(--lightGray-color)"
          : "var(--white-color)",
        border: isSelected
          ? "1px solid var(--primary-color)"
          : "1px solid var(--lightGray-color)",
      }}
      onClick={() => {
        push(`/user/chats/?room_id=${id}`);
      }}
      onContextMenu={handleContextMenu}>
      <div className="flex" style={{ justifyContent: "space-between" }}>
        <div
          className="flex"
          style={{ justifyContent: "space-between", gap: 8 }}>
          <Avatar img={img} online={online} />
          <div>
            <h4 style={{ fontWeight: 500, fontSize: 16 }}>{chat_name}</h4>
            <p style={{ marginTop: 4, fontWeight: unread ? "bold" : "normal" }}>
              {msg && trimContent(msg, 20)}
            </p>
          </div>
        </div>
        <div className="flex" style={{ flexDirection: "column", gap: 8 }}>
          {time && <h5 style={{ fontWeight: 600 }}>{showTime(time)}</h5>}
          {unread ? <div className="unread-count">{unread}</div> : null}
        </div>
      </div>
    </div>
  );
};

export default ChatElement;
