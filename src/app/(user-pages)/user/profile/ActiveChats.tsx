"use client"

import React, { Fragment, useState, useEffect } from 'react';
import { GoPlus } from "react-icons/go";
import { IoIosRefresh } from 'react-icons/io';
import Link from 'next/link';
import styles from "@/styles/profilePage.module.scss";

import { Loader, ProfileIcon, Tooltip } from '@/components';
import { FetchDirectConversations } from '@/redux/slices/conversationSlice';
import { useAppSelector } from '@/redux/hook';

const {
    activeChatsContainer,
    addConversationIcon,
    conversationBox,
  } = styles;

const ActiveChats = ({socket, isConnected, userId, dispatch, setIsOpenDialong}:any) => {
    const {
        direct_chat: { conversations },
      } = useAppSelector((state) => state.conversation);
      
    const [refreshChats, setRefreshChats] = useState<boolean>(false);
    const [chatLoading, setChatLoading] = useState<boolean>(false);

    useEffect(() => {
        if(userId){
          setChatLoading(true);
          socket?.emit(
            "get_conversations_list",
            { user_id: userId },
            (data: any) => {
              dispatch(FetchDirectConversations({ conversations: data }));
              setChatLoading(false);
            }
          );
        }
      }, [socket, isConnected, userId, refreshChats, dispatch]);

  return (
    <Fragment>
        <div className="flex" style={{ justifyContent: "flex-start" }}>
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
          <h3>Active Chats about orders</h3>
        </div>

        <div className={activeChatsContainer}>
          <div
            className={addConversationIcon}
            onClick={() => setIsOpenDialong(true)}>
            <GoPlus size={30} color="var(--white-color)" />
          </div>

          {isConnected ? (
            chatLoading ? <Loader /> :
            conversations.length ? (
              conversations.map((conv: any) => (
                <Link
                  key={conv.id}
                  href={{
                    pathname: "/user/chats",
                    query: { room_id: conv.id },
                  }}>
                  <div key={conv.id} className={conversationBox}>
                    <ProfileIcon name={conv.chat_name} img={conv.chat_image || conv.avatar} />
                  </div>
                </Link>
              ))
            ) : (
              <p>No Active Chats, Create one to start</p>
            )
          ) : (
            <p>Please wait, connecting....</p>
          )}
        </div>
    </Fragment>
  )
}

export default ActiveChats