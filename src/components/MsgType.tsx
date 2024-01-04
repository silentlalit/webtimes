"use client";

import React, { useState } from "react";
import { Message_options } from "@/utils/static/data";
import { HiOutlineDownload } from "react-icons/hi";
import { AiOutlineFileImage } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Image from "next/image";

const MessageOption = () => {
  const [isMenu, setIsMenu] = useState(false);

  const handleItemClick = (id: string) => {
    switch (id) {
      case "Reply":
        console.log(id);
        break;
      case "Delete Message":
        console.log(id);
        break;
    }
  };

  return (
    <div
      style={{ position: "relative" }}
      tabIndex={0}
      onBlur={() => setIsMenu(false)}>
      <BiDotsVerticalRounded size={20} onClick={() => setIsMenu(!isMenu)} />

      {isMenu && (
        <div
          style={{
            position: "absolute",
            bottom: 15,
            width: 130,
            background: "var(--lightGray-color)",
            border: "1px solid var(--exLightGray-color)",
            padding: 5,
            borderRadius: 5,
            right: 15,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            fontSize: 14,
            zIndex: 99999999
          }}>
          {Message_options?.map((el) => (
            <div key={el.title} id={el.title} onClick={() => handleItemClick(el.title)}>
              {el.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TextMsg = ({ el, menu }: any) => {
  return (
    <div
      className="flex"
      style={{ justifyContent: el.incoming ? "start" : "end" }}>
      <div
        style={{
          padding: 10,
          backgroundColor: el.incoming
            ? "var(--lightGray-color)"
            : "var(--secondary-color)",
          borderRadius: 10,
          width: "max-content",
        }}>
        <p
          style={{
            color: el.incoming ? "var(--black-color)" : "var(--white-color)",
            margin: 0,
          }}>
          {el.message}
        </p>
      </div>
      {menu && <MessageOption />}
    </div>
  );
};
const MediaMsg = ({ el, menu }: any) => {
  return (
    <div
      className="flex"
      style={{ justifyContent: el.incoming ? "start" : "end" }}>
      <div
        style={{
          padding: 5,
          backgroundColor: el.incoming
            ? "var(--lightGray-color)"
            : "var(--blue-color)",
          borderRadius: 10,
          width: "max-content",
        }}>
        <div className="flex" style={{ flexDirection: "column", gap: 4 }}>
          <Image
            src={el.img}
            alt={el.message}
            width={200}
            height={200}
            style={{ maxHeight: 210, borderRadius: "10px" }}
          />
          <p
            style={{
              color: el.incoming ? "var(--black-color)" : "var(--white-color)",
            }}>
            {el.message}
          </p>
        </div>
      </div>
      {menu && <MessageOption />}
    </div>
  );
};
const DocMsg = ({ el, menu }: any) => {
  return (
    <div
      className="flex"
      style={{ justifyContent: el.incoming ? "start" : "end" }}>
      <div
        style={{
          padding: 5,
          backgroundColor: el.incoming
            ? "var(--lightGray-color)"
            : "var(--blue-color)",
          borderRadius: 10,
          width: "max-content",
        }}>
        <div className="flex" style={{ gap: 8 }}>
          <div
            className="flex"
            style={{
              padding: 7,
              gap: 10,
              backgroundColor: "var(--lightGray-color)",
              borderRadius: 1,
            }}>
            <AiOutlineFileImage size={25} />
            <p style={{ margin: 0 }}>Abstract.png</p>
            <HiOutlineDownload size={20} />
          </div>
          <p
            style={{
              color: el.incoming ? "var(--black-color)" : "var(--white-color)",
              margin: 0,
            }}>
            {el.message}
          </p>
        </div>
      </div>
      {menu && <MessageOption />}
    </div>
  );
};
const LinkMsg = ({ el, menu }: any) => {
  return (
    <div
      className="flex"
      style={{ justifyContent: el.incoming ? "start" : "end" }}>
      <div
        style={{
          padding: 5,
          backgroundColor: el.incoming
            ? "var(--lightGray-color)"
            : "var(--blue-color)",
          borderRadius: 1.5,
          width: "max-content",
        }}>
        <div>
          <div
            className="flex"
            style={{
              padding: 7,
              gap: 10,
              backgroundColor: "var(--lightGray-color)",
              borderRadius: 1,
            }}>
            <div className="flex" style={{ flexDirection: "column", gap: 4 }}>
              {/* <Embed
                width="300px"
                isDark
                url={`https://youtu.be/xoWxBR34qLE`}
              /> */}
            </div>
          </div>
          <p
            style={{
              color: el.incoming ? "var(--black-color)" : "var(--white-color)",
              margin: 0,
            }}>
            <span dangerouslySetInnerHTML={{ __html: el.message }} />
          </p>
        </div>
      </div>
      {menu && <MessageOption />}
    </div>
  );
};
const ReplyMsg = ({ el, menu }: any) => {
  return (
    <div
      className="flex"
      style={{ justifyContent: el.incoming ? "start" : "end" }}>
      <div
        style={{
          padding: 10,
          backgroundColor: el.incoming
            ? "var(--lightGray-color)"
            : "var(--secondary-color)",
          borderRadius: 10,
          width: "max-content",
        }}>
        <div>
          <div
            className="flex"
            style={{
              padding: 7,
              gap: 10,
              backgroundColor: "var(--exLightGray-color)",
              borderRadius: 10,
            }}>
            <p
              style={{
                color: el.incoming ? "var(--black-color)" : "",
                margin: 0,
              }}>
              {el.message}
            </p>
          </div>

          <p
            style={{
              color: el.incoming ? "var(--black-color)" : "var(--white-color)",
              marginTop: 5,
            }}>
            {el.reply}
          </p>
        </div>
      </div>
      {menu && <MessageOption />}
    </div>
  );
};
const Timeline = ({ el }: any) => {
  return (
    <div className="flex" style={{ justifyContent: "space-between" }}>
      <hr style={{ width: "46%" }} />
      <p style={{ color: "var(--black-color)", margin: 0 }}>{el.text}</p>
      <hr style={{ width: "46%" }} />
    </div>
  );
};

export { Timeline, MediaMsg, LinkMsg, DocMsg, TextMsg, ReplyMsg };
